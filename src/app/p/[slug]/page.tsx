import { notFound } from 'next/navigation';
import prisma from '@/lib/db';

export const runtime = 'edge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface LrpConteudo {
  hero?: { titulo?: string; subtitulo?: string };
  contexto?: string;
  pontosObservados?: string[];
  prioridades?: string[];
  escopoContratado?: { nome: string; escopo: string; produtoId?: string }[];
  explicacaoServicos?: { nome: string; descricao: string; beneficios?: string[] }[];
  cronograma?: { fase: string; descricao: string; duracaoSemanas: number }[];
  materiaisNecessarios?: string[];
  proximosPassos?: string[];
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;

  const projeto = await prisma.projeto.findUnique({
    where: { slug },
    include: { cliente: true, servicosVendidos: true },
  });

  if (!projeto || projeto.status !== 'publicado') {
    notFound();
  }

  const lrp: LrpConteudo = projeto.lrpConteudoJson
    ? JSON.parse(projeto.lrpConteudoJson)
    : {};

  const empresa = projeto.cliente?.empresa || projeto.nomeProjeto;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav bar simples */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">V4</span>
          </div>
          <span className="text-sm font-semibold text-slate-700">V4 Company</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Proposta personalizada para {empresa}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            {lrp.hero?.titulo || `Planejamento Estratégico Digital — ${empresa}`}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {lrp.hero?.subtitulo ||
              'Com base no diagnóstico e alinhamento realizado, estruturamos as prioridades para evolução digital e geração de demanda.'}
          </p>
          <div className="mt-8">
            <a
              href="#escopo"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-500 transition-colors"
            >
              Ver escopo contratado ↓
            </a>
          </div>
        </div>
      </section>

      {/* Contexto */}
      {lrp.contexto && (
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">Contexto</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Onde vocês estão hoje</h2>
            <p className="text-slate-600 leading-relaxed">{lrp.contexto}</p>
          </div>
        </section>
      )}

      {/* Pontos observados */}
      {lrp.pontosObservados && lrp.pontosObservados.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">Diagnóstico</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Principais pontos observados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lrp.pontosObservados.map((ponto, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{ponto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prioridades */}
      {lrp.prioridades && lrp.prioridades.length > 0 && (
        <section className="py-16 px-4 bg-primary-600">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-primary-200 uppercase tracking-widest mb-3">Foco</p>
            <h2 className="text-2xl font-bold text-white mb-8">Prioridades do projeto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lrp.prioridades.map((p, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
                  <span className="text-4xl font-black text-white/20">0{i + 1}</span>
                  <p className="text-white font-medium mt-2">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Escopo contratado */}
      {lrp.escopoContratado && lrp.escopoContratado.length > 0 && (
        <section id="escopo" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">Contrato</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Escopo contratado</h2>
            <div className="space-y-4">
              {lrp.escopoContratado.map((servico, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-1">{servico.nome}</h3>
                  <p className="text-slate-600 text-sm">{servico.escopo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cronograma */}
      {lrp.cronograma && lrp.cronograma.length > 0 && (
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">Timeline</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Cronograma inicial</h2>
            <div className="space-y-3">
              {lrp.cronograma.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    S{i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{item.fase}</p>
                    <p className="text-sm text-slate-500">{item.descricao}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.duracaoSemanas} semana(s)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Materiais necessários */}
      {lrp.materiaisNecessarios && lrp.materiaisNecessarios.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-3">Checklist</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Materiais necessários de vocês</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lrp.materiaisNecessarios.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  <div className="w-5 h-5 rounded border-2 border-slate-200 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Próximos passos */}
      {lrp.proximosPassos && lrp.proximosPassos.length > 0 && (
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3">Ação</p>
            <h2 className="text-2xl font-bold text-white mb-8">Próximos passos</h2>
            <div className="space-y-3">
              {lrp.proximosPassos.map((passo, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded-xl">
                  <span className="text-2xl font-black text-primary-500/40">{i + 1}</span>
                  <span className="text-slate-200 font-medium">{passo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">V4</span>
            </div>
            <span>V4 Company</span>
          </div>
          <p>Proposta gerada com V4 Delivery Intelligence</p>
        </div>
      </footer>
    </div>
  );
}
