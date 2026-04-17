'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Projeto {
  id: string;
  nomeProjeto: string;
  slug: string;
  status: string;
  createdAt: string;
  cliente: { nome: string; empresa: string; email: string };
}

const statusColors: Record<string, string> = {
  draft:     'bg-slate-100 text-slate-500',
  intake:    'bg-amber-100 text-amber-700',
  analise:   'bg-blue-100 text-blue-700',
  revisao:   'bg-violet-100 text-violet-700',
  publicado: 'bg-emerald-100 text-emerald-700',
};

const statusLabels: Record<string, string> = {
  draft:     'Rascunho',
  intake:    'Intake',
  analise:   'Em análise',
  revisao:   'Em revisão',
  publicado: 'Publicado',
};

export default function DashboardPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProjetos() {
      try {
        const res = await fetch('/api/projetos');
        const data = await res.json();
        setProjetos(data.data || []);
      } catch {
        setProjetos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjetos();
  }, []);

  const filtered = projetos.filter(
    (p) =>
      !search ||
      p.nomeProjeto.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente?.empresa?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Projetos</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {projetos.length === 0 ? 'Nenhum projeto ainda' : `${projetos.length} projeto${projetos.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Link
            href="/projetos/novo"
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span>+</span> Novo Projeto
          </Link>
        </div>
      </header>

      <div className="p-8">
        {!loading && projetos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Comece seu primeiro projeto</h2>
            <p className="text-slate-500 text-sm max-w-sm mb-6">
              Preencha os dados do cliente, a transcrição da reunião e os serviços vendidos. O sistema gera o diagnóstico e a LRP automaticamente.
            </p>
            <Link
              href="/projetos/novo"
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Criar primeiro projeto →
            </Link>
          </div>
        )}

        {projetos.length > 0 && (
          <div className="mb-5">
            <input
              type="text"
              placeholder="Buscar por projeto ou empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-sm h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((projeto) => (
              <Link
                key={projeto.id}
                href={`/projetos/${projeto.id}/dashboard`}
                className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-primary-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                      {projeto.nomeProjeto}
                    </p>
                    <p className="text-sm text-slate-500 truncate">{projeto.cliente?.empresa}</p>
                  </div>
                  <span className={cn('ml-2 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0', statusColors[projeto.status] || 'bg-slate-100 text-slate-500')}>
                    {statusLabels[projeto.status] || projeto.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{projeto.cliente?.email}</span>
                  <span>Ver projeto →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
