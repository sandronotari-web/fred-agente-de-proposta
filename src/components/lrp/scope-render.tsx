'use client';

interface ServicoItem {
  nome: string;
  descricao: string;
}

interface ScopeRenderProps {
  servicos: ServicoItem[];
}

export function ScopeRender({ servicos = [] }: ScopeRenderProps) {
  if (servicos.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Escopo Contratado</h2>
        <div className="space-y-4">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{servico.nome}</h3>
              </div>
              {servico.descricao && (
                <p className="text-slate-600 ml-11">{servico.descricao}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}