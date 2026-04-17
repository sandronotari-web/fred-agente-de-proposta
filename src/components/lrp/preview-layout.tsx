'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

interface LRPData {
  hero: {
    titulo: string;
    subtitulo: string;
  };
  contexto: string;
  pontosObservados: string[];
  prioridades: { titulo: string; descricao: string; impacto: string }[];
  escopoContratado: { nome: string; descricao: string }[];
  cronograma: { fase: string; descricao: string; duracaoSemanas: number }[];
  materiaisNecessarios: string[];
  proximosPassos: string[];
}

interface PreviewLayoutProps {
  data: LRPData;
  projetoNome: string;
  projetoId: string;
}

export function PreviewLayout({ data, projetoNome, projetoId }: PreviewLayoutProps) {
  const { HeroRender } = require('./hero-render');
  const { ContextoRender } = require('./contexto-render');
  const { ProblemsRender } = require('./problems-render');
  const { ScopeRender } = require('./scope-render');
  const { TimelineRender } = require('./timeline-render');
  const { MaterialsRender } = require('./materials-render');
  const { NextStepsRender } = require('./next-steps-render');

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/projetos/${projetoId}/editor`}>
              <Button variant="outline" size="sm">
                ← Voltar ao Editor
              </Button>
            </Link>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Preview
              </p>
              <p className="font-medium text-slate-900">{projetoNome}</p>
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
        <HeroRender titulo={data.hero.titulo} subtitulo={data.hero.subtitulo} />
        <ContextoRender contexto={data.contexto} />
        <ProblemsRender pontos={data.pontosObservados} />
        <ScopeRender servicos={data.escopoContratado} />
        <TimelineRender cronograma={data.cronograma} />
        <MaterialsRender materiais={data.materiaisNecessarios} />
        <NextStepsRender proximosPassos={data.proximosPassos} />

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Proposta elaborada por V4 Delivery Intelligence
          </p>
        </footer>
      </div>
    </main>
  );
}