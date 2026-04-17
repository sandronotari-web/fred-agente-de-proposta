'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MateriaisSectionProps {
  materiais: string[];
  onChange: (materiais: string[]) => void;
  editable?: boolean;
}

export function MateriaisSection({ materiais = [], onChange, editable = true }: MateriaisSectionProps) {
  const addMaterial = () => {
    onChange([...materiais, '']);
  };

  const updateMaterial = (index: number, value: string) => {
    const updated = [...materiais];
    updated[index] = value;
    onChange(updated);
  };

  const removeMaterial = (index: number) => {
    onChange(materiais.filter((_, i) => i !== index));
  };

  if (!editable) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Materiais Necessários</h2>
        {materiais.length === 0 ? (
          <p className="text-slate-500">Nenhum material necessário.</p>
        ) : (
          <ul className="space-y-2">
            {materiais.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  return (
    <div>
      <Label>Materiais Necessários</Label>
      <p className="text-sm text-slate-500 mb-2">Materiais que o cliente precisa fornecer</p>
      <div className="space-y-2 mb-2">
        {materiais.map((m, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={m}
              onChange={(e) => updateMaterial(i, e.target.value)}
              placeholder="Material necessário..."
            />
            <Button variant="ghost" size="sm" onClick={() => removeMaterial(i)}>×</Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addMaterial}>+ Adicionar Material</Button>
    </div>
  );
}