'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProblemasSectionProps {
  pontos: string[];
  onChange: (pontos: string[]) => void;
  editable?: boolean;
}

export function ProblemasSection({ pontos = [], onChange, editable = true }: ProblemasSectionProps) {
  const addPonto = () => {
    onChange([...pontos, '']);
  };

  const updatePonto = (index: number, value: string) => {
    const updated = [...pontos];
    updated[index] = value;
    onChange(updated);
  };

  const removePonto = (index: number) => {
    onChange(pontos.filter((_, i) => i !== index));
  };

  if (!editable) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pontos Observados</h2>
        {pontos.length === 0 ? (
          <p className="text-slate-500">Nenhum ponto observado.</p>
        ) : (
          <ul className="space-y-2">
            {pontos.map((ponto, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>{ponto}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  return (
    <div>
      <Label>Pontos Observados</Label>
      <p className="text-sm text-slate-500 mb-2">Um ponto por linha</p>
      <div className="space-y-2 mb-2">
        {pontos.map((ponto, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={ponto}
              onChange={(e) => updatePonto(i, e.target.value)}
              placeholder="Point observed..."
            />
            <Button variant="ghost" size="sm" onClick={() => removePonto(i)}>×</Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addPonto}>+ Adicionar Ponto</Button>
    </div>
  );
}