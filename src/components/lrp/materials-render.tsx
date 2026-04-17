'use client';

interface MaterialsRenderProps {
  materiais: string[];
}

export function MaterialsRender({ materiais = [] }: MaterialsRenderProps) {
  if (materiais.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Materiais Necessários</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="text-sm text-yellow-800 mb-3">
            Para darmos continuidade, precisamos que você nos forneça:
          </p>
          <ul className="space-y-2">
            {materiais.map((material, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-yellow-400 rounded flex-shrink-0" />
                <span className="text-slate-700">{material}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}