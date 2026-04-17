'use client';

interface ProblemsRenderProps {
  pontos: string[];
}

export function ProblemsRender({ pontos = [] }: ProblemsRenderProps) {
  if (pontos.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Pontos Observados</h2>
        <div className="grid gap-3">
          {pontos.map((ponto, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <p className="text-slate-700">{ponto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}