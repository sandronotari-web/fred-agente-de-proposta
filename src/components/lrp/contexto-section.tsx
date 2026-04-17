'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContextoSectionProps {
  contexto: string;
  onChange: (value: string) => void;
  editable?: boolean;
}

export function ContextoSection({ contexto, onChange, editable = true }: ContextoSectionProps) {
  if (!editable) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contexto</h2>
        <p className="text-slate-700 whitespace-pre-wrap">{contexto || 'Nenhum contexto disponível.'}</p>
      </section>
    );
  }

  return (
    <div>
      <Label>Contexto</Label>
      <p className="text-sm text-slate-500 mb-2">Breve contexto do projeto</p>
      <Textarea
        value={contexto}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Descreva o contexto do projeto..."
        rows={4}
      />
    </div>
  );
}