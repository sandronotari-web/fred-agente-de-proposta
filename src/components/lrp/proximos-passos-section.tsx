'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProximosPassosSectionProps {
  passos: string[];
  onChange: (passos: string[]) => void;
  editable?: boolean;
}

export function ProximosPassosSection({ passos = [], onChange, editable = true }: ProximosPassosSectionProps) {
  const addPasso = () => {
    onChange([...passos, '']);
  };

  const updatePasso = (index: number, value: string) => {
    const updated = [...passos];
    updated[index] = value;
    onChange(updated);
  };

  const removePasso = (index: number) => {
    onChange(passos.filter((_, i) => i !== index));
  };

  if (!editable) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Próximos Passos</h2>
        {passos.length === 0 ? (
          <p className="text-slate-500">Nenhum próximo passo definido.</p>
        ) : (
          <ol className="space-y-2">
            {passos.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-600 font-medium">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }

  return (
    <div>
      <Label>Próximos Passos</Label>
      <div className="space-y-2 mb-2">
        {passos.map((p, i) => (
          <div key={i} className="flex gap-2">
            <span className="w-6 text-slate-400 mt-2">{i + 1}.</span>
            <Input
              value={p}
              onChange={(e) => updatePasso(i, e.target.value)}
              placeholder="Próximo passo..."
            />
            <Button variant="ghost" size="sm" onClick={() => removePasso(i)}>×</Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addPasso}>+ Adicionar Passo</Button>
    </div>
  );
}