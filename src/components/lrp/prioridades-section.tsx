'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Prioridade {
  titulo: string;
  descricao: string;
  impacto: 'alto' | 'medio' | 'baixo';
}

interface PrioridadesSectionProps {
  prioridades: Prioridade[];
  onChange: (prioridades: Prioridade[]) => void;
  editable?: boolean;
}

export function PrioridadesSection({ prioridades = [], onChange, editable = true }: PrioridadesSectionProps) {
  const addPrioridade = () => {
    onChange([...prioridades, { titulo: '', descricao: '', impacto: 'medio' }]);
  };

  const updatePrioridade = (index: number, field: keyof Prioridade, value: string) => {
    const updated = [...prioridades];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removePrioridade = (index: number) => {
    onChange(prioridades.filter((_, i) => i !== index));
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'alto': return 'bg-red-100 text-red-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (!editable) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Prioridades</h2>
        {prioridades.length === 0 ? (
          <p className="text-slate-500">Nenhuma prioridade definida.</p>
        ) : (
          <div className="space-y-3">
            {prioridades.map((p, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{p.titulo}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getImpactoColor(p.impacto)}`}>
                    {p.impacto}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{p.descricao}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <Label>Prioridades</Label>
      <div className="space-y-3 mb-3">
        {prioridades.map((p, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <div className="flex gap-2 mb-2">
              <Input
                value={p.titulo}
                onChange={(e) => updatePrioridade(i, 'titulo', e.target.value)}
                placeholder="Título"
                className="flex-1"
              />
              <select
                value={p.impacto}
                onChange={(e) => updatePrioridade(i, 'impacto', e.target.value)}
                className="rounded border px-2"
              >
                <option value="alto">Alto</option>
                <option value="medio">Médio</option>
                <option value="baixo">Baixo</option>
              </select>
              <Button variant="ghost" size="sm" onClick={() => removePrioridade(i)}>×</Button>
            </div>
            <Textarea
              value={p.descricao}
              onChange={(e) => updatePrioridade(i, 'descricao', e.target.value)}
              placeholder="Descrição"
              rows={2}
            />
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addPrioridade}>+ Adicionar Prioridade</Button>
    </div>
  );
}