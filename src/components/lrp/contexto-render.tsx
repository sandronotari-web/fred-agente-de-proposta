'use client';

interface ContextoRenderProps {
  contexto: string;
}

export function ContextoRender({ contexto }: ContextoRenderProps) {
  if (!contexto) return null;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contexto</h2>
        <div className="bg-slate-50 rounded-xl p-6">
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
            {contexto}
          </p>
        </div>
      </div>
    </section>
  );
}