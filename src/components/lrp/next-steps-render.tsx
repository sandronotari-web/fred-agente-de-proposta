'use client';

interface NextStepsRenderProps {
  proximosPassos: string[];
}

export function NextStepsRender({ proximosPassos = [] }: NextStepsRenderProps) {
  if (proximosPassos.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Próximos Passos</h2>
        <ol className="space-y-3">
          {proximosPassos.map((passo, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <p className="text-slate-700 pt-1">{passo}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}