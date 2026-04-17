'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface ServicoItem {
  nome: string;
  descricao: string;
}

interface EditScopeBlockProps {
  label: string;
  servicos: ServicoItem[];
  onChange: (servicos: ServicoItem[]) => void;
  description?: string;
}

export function EditScopeBlock({
  label,
  servicos = [],
  onChange,
  description,
}: EditScopeBlockProps) {
  const handleAdd = () => {
    onChange([...servicos, { nome: '', descricao: '' }]);
  };

  const handleUpdate = (index: number, field: keyof ServicoItem, value: string) => {
    const updated = [...servicos];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(servicos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>{label}</Label>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        {servicos.map((servico, index) => (
          <Card key={index}>
            <CardHeader className="py-3 pb-0">
              <div className="flex items-center justify-between">
                <Input
                  value={servico.nome}
                  onChange={(e) => handleUpdate(index, 'nome', e.target.value)}
                  placeholder="Nome do serviço"
                  className="font-medium"
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
            </CardHeader>
            <CardContent className="py-3">
              <Textarea
                value={servico.descricao}
                onChange={(e) => handleUpdate(index, 'descricao', e.target.value)}
                placeholder="Descrição do escopo..."
                rows={3}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={handleAdd}>
        + Adicionar Serviço
      </Button>
    </div>
  );
}