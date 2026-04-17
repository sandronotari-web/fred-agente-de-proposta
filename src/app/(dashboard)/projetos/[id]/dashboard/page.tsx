'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Projeto {
  id: string;
  nomeProjeto: string;
  slug: string;
  status: string;
  transcricao?: string;
  observacoes?: string;
  diagnosticoJson?: string;
  lrpConteudoJson?: string;
  cliente: { nome: string; empresa: string; email: string };
  servicosVendidos: { id: string; nome: string; escopo: string }[];
}

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  intake: 'Intake',
  analise: 'Análise',
  revisao: 'Revisão',
  publicado: 'Publicado',
};

const statusColors: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  intake: 'bg-yellow-100 text-yellow-700',
  analise: 'bg-blue-100 text-blue-700',
  revisao: 'bg-purple-100 text-purple-700',
  publicado: 'bg-green-100 text-green-700',
};

export default function ProjetoDashboardPage() {
  const params = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');

  async function fetchProjeto() {
    try {
      const res = await fetch(`/api/projetos/${params.id}`);
      const data = await res.json();
      setProjeto(data.data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchProjeto(); }, [params.id]);

  const handleGenerateDiagnosis = async () => {
    setActionLoading('diagnosis');
    try {
      await fetch('/api/generate-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projetoId: params.id }),
      });
      await fetchProjeto();
    } catch { /* ignore */ } finally {
      setActionLoading('');
    }
  };

  const handleGenerateLRP = async () => {
    setActionLoading('lrp');
    try {
      await fetch('/api/generate-client-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projetoId: params.id }),
      });
      await fetchProjeto();
    } catch { /* ignore */ } finally {
      setActionLoading('');
    }
  };

  const handlePublish = async () => {
    setActionLoading('publish');
    try {
      await fetch(`/api/projetos/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'publicado' }),
      });
      await fetchProjeto();
    } catch { /* ignore */ } finally {
      setActionLoading('');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-64" />
          <div className="h-4 bg-slate-200 rounded w-48" />
        </div>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Projeto não encontrado.</p>
        <Link href="/dashboard" className="text-primary-600 text-sm mt-2 inline-block">← Voltar</Link>
      </div>
    );
  }

  const diagnostico = projeto.diagnosticoJson ? JSON.parse(projeto.diagnosticoJson) : null;
  const lrp = projeto.lrpConteudoJson ? JSON.parse(projeto.lrpConteudoJson) : null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">← Projetos</Link>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{projeto.nomeProjeto}</h1>
            <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', statusColors[projeto.status] || 'bg-slate-100 text-slate-600')}>
              {statusLabels[projeto.status] || projeto.status}
            </span>
          </div>
          <p className="text-slate-500 mt-1">{projeto.cliente?.empresa} · {projeto.cliente?.email}</p>
        </div>

        <div className="flex gap-2">
          <Link href={`/projetos/${projeto.id}/intake`}>
            <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              Editar intake
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-5">
          {/* Serviços vendidos */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Serviços contratados</h3>
            {projeto.servicosVendidos.length === 0 ? (
              <p className="text-slate-400 text-sm">Nenhum serviço cadastrado.</p>
            ) : (
              <div className="space-y-3">
                {projeto.servicosVendidos.map((s) => (
                  <div key={s.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-slate-900">{s.nome}</p>
                      {s.escopo && <p className="text-xs text-slate-500 mt-0.5">{s.escopo}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Diagnóstico */}
          {diagnostico ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Diagnóstico gerado</h3>
              {diagnostico.sintomas?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Sintomas</p>
                  <ul className="space-y-1">
                    {diagnostico.sintomas.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-orange-400 mt-0.5">⚠</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {diagnostico.oportunidades?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Oportunidades</p>
                  <ul className="space-y-1">
                    {diagnostico.oportunidades.map((o: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-green-500 mt-0.5">✓</span> {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {diagnostico.riscos?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Riscos</p>
                  <ul className="space-y-1">
                    {diagnostico.riscos.map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-red-400 mt-0.5">●</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-8 text-center">
              <p className="text-slate-400 mb-3">Diagnóstico ainda não gerado</p>
              {projeto.transcricao ? (
                <button
                  onClick={handleGenerateDiagnosis}
                  disabled={actionLoading === 'diagnosis'}
                  className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60"
                >
                  {actionLoading === 'diagnosis' ? 'Gerando (pode levar ~30s)...' : 'Gerar diagnóstico com IA'}
                </button>
              ) : (
                <p className="text-xs text-slate-400">Adicione a transcrição da reunião primeiro</p>
              )}
            </div>
          )}

          {/* Observações */}
          {projeto.observacoes && (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Observações do closer</h3>
              <p className="text-slate-600 text-sm whitespace-pre-wrap">{projeto.observacoes}</p>
            </div>
          )}
        </div>

        {/* Coluna lateral */}
        <div className="space-y-5">
          {/* Ações */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Ações</h3>
            <div className="space-y-2">
              {!lrp ? (
                <button
                  onClick={handleGenerateLRP}
                  disabled={actionLoading === 'lrp'}
                  className="w-full px-4 py-2.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60 font-medium"
                >
                  {actionLoading === 'lrp' ? 'Gerando LRP...' : 'Gerar LRP do cliente'}
                </button>
              ) : projeto.status !== 'publicado' ? (
                <>
                  <button
                    onClick={handlePublish}
                    disabled={actionLoading === 'publish'}
                    className="w-full px-4 py-2.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60 font-medium"
                  >
                    {actionLoading === 'publish' ? 'Publicando...' : 'Publicar LRP'}
                  </button>
                  <button
                    onClick={handleGenerateLRP}
                    disabled={actionLoading === 'lrp'}
                    className="w-full px-4 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Regenerar LRP
                  </button>
                </>
              ) : (
                <>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium text-center">
                    ✓ LRP publicada
                  </div>
                  <Link
                    href={`/p/${projeto.slug}`}
                    target="_blank"
                    className="block w-full px-4 py-2.5 border border-primary-200 text-primary-600 text-sm rounded-lg hover:bg-primary-50 transition-colors text-center font-medium"
                  >
                    Ver LRP do cliente →
                  </Link>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/p/${projeto.slug}`)}
                    className="w-full px-4 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Copiar link
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Info do cliente */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Cliente</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs text-slate-400">Nome</dt>
                <dd className="text-slate-700">{projeto.cliente?.nome}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Empresa</dt>
                <dd className="text-slate-700 font-medium">{projeto.cliente?.empresa}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Email</dt>
                <dd className="text-slate-700">{projeto.cliente?.email}</dd>
              </div>
            </dl>
          </div>

          {/* Transcrição */}
          {projeto.transcricao && (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Transcrição</h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">{projeto.transcricao}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
