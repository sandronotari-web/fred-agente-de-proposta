'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface TimelineItem {
  fase: string;
  descricao: string;
  duracaoSemanas: number;
}

interface EditTimelineBlockProps {
  label: string;
  cronograma: TimelineItem[];
  onChange: (cronograma: TimelineItem[]) => void;
  description?: string;
}

export function EditTimelineBlock({
  label,
  cronograma = [],
  onChange,
  description,
}: EditTimelineBlockProps) {
  const handleAdd = () => {
    onChange([...cronograma, { fase: '', descricao: '', duracaoSemanas: 2 }]);
  };

  const handleUpdate = (index: number, field: keyof TimelineItem, value: string | number) => {
    const updated = [...cronograma];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(cronograma.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>{label}</Label>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="space-y-2">
        {cronograma.map((item, index) => (
          <Card key={index}>
            <CardContent className="py-3">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={item.fase}
                  onChange={(e) => handleUpdate(index, 'fase', e.target.value)}
                  placeholder="Fase"
                  className="w-32"
                />
                <Input
                  value={item.descricao}
                  onChange={(e) => handleUpdate(index, 'descricao', e.target.value)}
                  placeholder="Descrição"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={item.duracaoSemanas}
                  onChange={(e) => handleUpdate(index, 'duracaoSemanas', parseInt(e.target.value) || 1)}
                  placeholder="Semanas"
                  className="w-20"
                  min={1}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(index)}
                  className="text-slate-400 hover:text-red-500"
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={handleAdd}>
        + Adicionar Fase
      </Button>
    </div>
  );
}