'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CronogramaItem {
  fase: string;
  descricao: string;
  duracaoSemanas: number;
}

interface CronogramaSectionProps {
  cronograma: CronogramaItem[];
  onChange: (cronograma: CronogramaItem[]) => void;
  formatoCliente?: 'enterprise' | 'mittelstand' | 'startup';
  editable?: boolean;
}

export function CronogramaSection({ 
  cronograma = [], 
  onChange, 
  formatoCliente = 'mittelstand',
  editable = true 
}: CronogramaSectionProps) {
  const addItem = () => {
    onChange([...cronograma, { fase: '', descricao: '', duracaoSemanas: 2 }]);
  };

  const updateItem = (index: number, field: keyof CronogramaItem, value: string | number) => {
    const updated = [...cronograma];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(cronograma.filter((_, i) => i !== index));
  };

  const getTimelineLabel = () => {
    switch (formatoCliente) {
      case 'enterprise': return 'Fase (Mês 1-2)';
      case 'startup': return 'Sprint';
      default: return 'Fase';
    }
  };

  const renderPublico = () => (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Cronograma</h2>
      {cronograma.length === 0 ? (
        <p className="text-slate-500">Nenhum cronograma definido.</p>
      ) : (
        <div className="space-y-3">
          {cronograma.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-medium w-32">{item.fase}</span>
              <span className="text-slate-600 flex-1">{item.descricao}</span>
              <span className="text-sm text-slate-500">({item.duracaoSemanas} semanas)</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  if (!editable) return renderPublico();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label>Cronograma</Label>
        <span className="text-xs text-slate-500">Adaptado para {formatoCliente}</span>
      </div>
      <div className="space-y-3 mb-3">
        {cronograma.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              value={item.fase}
              onChange={(e) => updateItem(i, 'fase', e.target.value)}
              placeholder={getTimelineLabel()}
              className="w-40"
            />
            <Input
              value={item.descricao}
              onChange={(e) => updateItem(i, 'descricao', e.target.value)}
              placeholder="Descrição"
              className="flex-1"
            />
            <Input
              type="number"
              value={item.duracaoSemanas}
              onChange={(e) => updateItem(i, 'duracaoSemanas', parseInt(e.target.value) || 1)}
              className="w-24"
              min={1}
            />
            <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>×</Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addItem}>+ Adicionar Fase</Button>
    </div>
  );
}