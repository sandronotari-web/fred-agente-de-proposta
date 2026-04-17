'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui';

interface EditListBlockProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  description?: string;
  emptyMessage?: string;
}

export function EditListBlock({
  label,
  items = [],
  onChange,
  placeholder = 'Adicionar item...',
  description,
  emptyMessage = 'Nenhum item',
}: EditListBlockProps) {
  const handleAdd = () => {
    onChange([...items, '']);
  };

  const handleUpdate = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
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
        {items.length === 0 ? (
          <p className="text-sm text-slate-400 italic">{emptyMessage}</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-6 text-sm text-slate-400">{index + 1}.</span>
              <Input
                value={item}
                onChange={(e) => handleUpdate(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1"
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
          ))
        )}
      </div>

      <Button variant="outline" size="sm" onClick={handleAdd}>
        + Adicionar
      </Button>
    </div>
  );
}