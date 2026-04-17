'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeroSectionProps {
  titulo: string;
  subtitulo: string;
  onChange: (field: 'titulo' | 'subtitulo', value: string) => void;
  editable?: boolean;
}

export function HeroSection({ titulo, subtitulo, onChange, editable = true }: HeroSectionProps) {
  if (!editable) {
    return (
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{titulo}</h1>
        {subtitulo && <p className="text-xl text-slate-600">{subtitulo}</p>}
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Título Principal</Label>
        <Input
          value={titulo}
          onChange={(e) => onChange('titulo', e.target.value)}
          placeholder="Proposta para [Empresa]"
        />
      </div>
      <div>
        <Label>Subtítulo</Label>
        <Input
          value={subtitulo}
          onChange={(e) => onChange('subtitulo', e.target.value)}
          placeholder="Proposta customizada"
        />
      </div>
    </div>
  );
}