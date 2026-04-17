'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { HeroRender } from '@/components/lrp/hero-render';
import { ContextoRender } from '@/components/lrp/contexto-render';
import { ProblemsRender } from '@/components/lrp/problems-render';
import { ScopeRender } from '@/components/lrp/scope-render';
import { TimelineRender } from '@/components/lrp/timeline-render';
import { MaterialsRender } from '@/components/lrp/materials-render';
import { NextStepsRender } from '@/components/lrp/next-steps-render';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface LRPData {
  hero: {
    titulo: string;
    subtitulo: string;
  };
  contexto: string;
  pontosObservados: string[];
  escopoContratado: { nome: string; descricao: string }[];
  cronograma: { fase: string; descricao: string; duracaoSemanas: number }[];
  materiaisNecessarios: string[];
  proximosPassos: string[];
}

interface Projeto {
  id: string;
  nomeProjeto: string;
  slug: string;
  lrpConteudoJson?: string;
}

export default function PreviewPage() {
  const params = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [data, setData] = useState<LRPData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjeto() {
      try {
        const res = await fetch(`/api/projetos/${params.id}`);
        const result = await res.json();
        setProjeto(result.data);
        
        if (result.data.lrpConteudoJson) {
          setData(JSON.parse(result.data.lrpConteudoJson));
        }
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjeto();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-500">Carregando preview...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Nenhum conteúdo disponível.</p>
          <Link href={`/projetos/${params.id}/editor`}>
            <Button>Ir para Editor</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/projetos/${params.id}/editor`}>
              <Button variant="outline" size="sm">
                ← Voltar ao Editor
              </Button>
            </Link>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Preview
              </p>
              <p className="font-medium text-slate-900">{projeto?.nomeProjeto}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
              Visualização interna
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <HeroRender titulo={data.hero?.titulo || ''} subtitulo={data.hero?.subtitulo} />
        <ContextoRender contexto={data.contexto || ''} />
        <ProblemsRender pontos={data.pontosObservados || []} />
        <ScopeRender servicos={data.escopoContratado || []} />
        <TimelineRender cronograma={data.cronograma || []} />
        <MaterialsRender materiais={data.materiaisNecessarios || []} />
        <NextStepsRender proximosPassos={data.proximosPassos || []} />

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Proposta elaborada por V4 Delivery Intelligence
          </p>
        </footer>
      </div>
    </main>
  );
}