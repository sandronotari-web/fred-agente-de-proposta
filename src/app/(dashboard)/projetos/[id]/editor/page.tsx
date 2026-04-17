'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { EditTextBlock, EditListBlock, EditScopeBlock, EditTimelineBlock, EditorActions } from '@/components/editor';

interface ServicoItem {
  nome: string;
  descricao: string;
}

interface TimelineItem {
  fase: string;
  descricao: string;
  duracaoSemanas: number;
}

interface LRPData {
  hero: {
    titulo: string;
    subtitulo: string;
  };
  contexto: string;
  pontosObservados: string[];
  prioridades: { titulo: string; descricao: string; impacto: string }[];
  escopoContratado: ServicoItem[];
  explicacaoServicos: ServicoItem[];
  cronograma: TimelineItem[];
  materiaisNecessarios: string[];
  proximosPassos: string[];
}

interface Projeto {
  id: string;
  nomeProjeto: string;
  slug: string;
  status: string;
  lrpConteudoJson?: string;
  diagnosticoJson?: string;
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [data, setData] = useState<LRPData>({
    hero: { titulo: '', subtitulo: '' },
    contexto: '',
    pontosObservados: [],
    prioridades: [],
    escopoContratado: [],
    explicacaoServicos: [],
    cronograma: [],
    materiaisNecessarios: [],
    proximosPassos: [],
  });

  useEffect(() => {
    async function fetchProjeto() {
      try {
        const res = await fetch(`/api/projetos/${params.id}`);
        const result = await res.json();
        const projetoData = result.data;
        setProjeto(projetoData);

        if (projetoData.lrpConteudoJson) {
          setData(JSON.parse(projetoData.lrpConteudoJson));
        }
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjeto();
  }, [params.id]);

  const updateField = (field: string, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateHero = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projetos/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lrpConteudo: data,
          status: 'revisao',
        }),
      });
      
      if (res.ok) {
        setHasChanges(false);
        alert('Alterações salvas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/projetos/${params.id}/dashboard`);
  };

  const handlePreview = () => {
    router.push(`/projetos/${params.id}/preview`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="container-custom">
          <p>Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="container-custom flex items-center justify-between">
          <div>
            <Link
              href={`/projetos/${params.id}/dashboard`}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              ← Voltar
            </Link>
            <h1 className="text-xl font-bold text-slate-900">
              Editor de Revisão
            </h1>
            <p className="text-sm text-slate-600">{projeto?.nomeProjeto}</p>
          </div>
          <Badge variant="warning">Rascunho</Badge>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="space-y-8 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>1. Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <EditTextBlock
                label="Título"
                value={data.hero.titulo}
                onChange={(v) => updateHero('titulo', v)}
                placeholder="Proposta para [Empresa]"
              />
              <EditTextBlock
                label="Subtítulo"
                value={data.hero.subtitulo}
                onChange={(v) => updateHero('subtitulo', v)}
                placeholder="Proposta customizada"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Contexto</CardTitle>
            </CardHeader>
            <CardContent>
              <EditTextBlock
                label="Texto introdutório"
                value={data.contexto}
                onChange={(v) => updateField('contexto', v)}
                placeholder="Descreva o contexto do projeto..."
                multiline
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Pontos Observados</CardTitle>
            </CardHeader>
            <CardContent>
              <EditListBlock
                label="Lista de pontos"
                items={data.pontosObservados}
                onChange={(v) => updateField('pontosObservados', v)}
                placeholder="Ponto observado..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Escopo Contratado</CardTitle>
            </CardHeader>
            <CardContent>
              <EditScopeBlock
                label="Serviços"
                servicos={data.escopoContratado}
                onChange={(v) => updateField('escopoContratado', v)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Cronograma</CardTitle>
            </CardHeader>
            <CardContent>
              <EditTimelineBlock
                label="Fases"
                cronograma={data.cronograma}
                onChange={(v) => updateField('cronograma', v)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Materiais Necessários</CardTitle>
            </CardHeader>
            <CardContent>
              <EditListBlock
                label="Materiais"
                items={data.materiaisNecessarios}
                onChange={(v) => updateField('materiaisNecessarios', v)}
                placeholder="Material necessário..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <EditListBlock
                label="Próximos passos"
                items={data.proximosPassos}
                onChange={(v) => updateField('proximosPassos', v)}
                placeholder="Próximo passo..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <EditorActions
        onSave={handleSave}
        onCancel={handleCancel}
        onPreview={handlePreview}
        isLoading={saving}
        hasChanges={hasChanges}
      />
    </main>
  );
}