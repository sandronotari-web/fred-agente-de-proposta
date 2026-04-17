'use client';

interface HeroRenderProps {
  titulo: string;
  subtitulo?: string;
}

export function HeroRender({ titulo, subtitulo }: HeroRenderProps) {
  return (
    <section className="text-center py-16 bg-gradient-to-b from-slate-50 to-white">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">{titulo}</h1>
      {subtitulo && (
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">{subtitulo}</p>
      )}
    </section>
  );
}