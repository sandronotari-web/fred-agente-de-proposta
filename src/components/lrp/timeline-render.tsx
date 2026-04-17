'use client';

interface TimelineItem {
  fase: string;
  descricao: string;
  duracaoSemanas: number;
}

interface TimelineRenderProps {
  cronograma: TimelineItem[];
}

export function TimelineRender({ cronograma = [] }: TimelineRenderProps) {
  if (cronograma.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cronograma</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
          <div className="space-y-6">
            {cronograma.map((item, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-2.5 w-3 h-3 bg-primary-600 rounded-full border-2 border-white" />
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900">{item.fase}</h3>
                    <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded">
                      {item.duracaoSemanas} semana{item.duracaoSemanas !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {item.descricao && (
                    <p className="text-slate-600 text-sm">{item.descricao}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}