'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ProdutoFormData } from '@/schemas/produto.schema';

interface ProdutoFormProps {
  initialData?: Partial<ProdutoFormData>;
  onSubmit: (data: ProdutoFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProdutoForm({ initialData, onSubmit, isLoading }: ProdutoFormProps) {
  const [formData, setFormData] = useState<ProdutoFormData>({
    productKey: initialData?.productKey || '',
    productName: initialData?.productName || '',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    idealFor: initialData?.idealFor || [],
    mainPainsSolved: initialData?.mainPainsSolved || [],
    deliverablesJson: initialData?.deliverablesJson || [],
    differentialsJson: initialData?.differentialsJson || [],
    priorityRulesJson: initialData?.priorityRulesJson || [],
  });

  const handleArrayChange = (field: keyof ProdutoFormData, value: string) => {
    const items = value.split('\n').map((item) => item.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="productKey">Product Key *</Label>
          <Input
            id="productKey"
            value={formData.productKey}
            onChange={(e) => setFormData({ ...formData, productKey: e.target.value })}
            placeholder="ex: sdr-basico"
            required
          />
        </div>
        <div>
          <Label htmlFor="productName">Nome do Produto *</Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            placeholder="ex: SDR Starter"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">Descrição Curta *</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="Breve descrição do produto"
          required
        />
      </div>

      <div>
        <Label htmlFor="fullDescription">Descrição Completa *</Label>
        <Textarea
          id="fullDescription"
          value={formData.fullDescription}
          onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
          placeholder="Descrição completa do produto e seus benefícios"
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="idealFor">Ideal Para (um por linha)</Label>
        <Textarea
          id="idealFor"
          defaultValue={formData.idealFor?.join('\n')}
          onChange={(e) => handleArrayChange('idealFor', e.target.value)}
          placeholder=" Startups em crescimento&#10;E-commerces de médio porte"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="mainPainsSolved">Dores que Resolve (um por linha)</Label>
        <Textarea
          id="mainPainsSolved"
          defaultValue={formData.mainPainsSolved?.join('\n')}
          onChange={(e) => handleArrayChange('mainPainsSolved', e.target.value)}
          placeholder=" Sem tempo para prospecção&#10;Dificuldade em fechar propostas"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="deliverablesJson">Entregáveis (um por linha)</Label>
        <Textarea
          id="deliverablesJson"
          defaultValue={formData.deliverablesJson?.join('\n')}
          onChange={(e) => handleArrayChange('deliverablesJson', e.target.value)}
          placeholder=" Lista de leads qualificados&#10;Relatório semanal"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="differentialsJson">Diferenciais (um por linha)</Label>
        <Textarea
          id="differentialsJson"
          defaultValue={formData.differentialsJson?.join('\n')}
          onChange={(e) => handleArrayChange('differentialsJson', e.target.value)}
          placeholder=" Metodologia comprovada&#10;Suporte dedicado"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="priorityRulesJson">Regras de Prioridade (um por linha)</Label>
        <Textarea
          id="priorityRulesJson"
          defaultValue={formData.priorityRulesJson?.join('\n')}
          onChange={(e) => handleArrayChange('priorityRulesJson', e.target.value)}
          placeholder=" Urgência alta: entrega em 7 dias&#10;Urgência média: entrega em 14 dias"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Produto'}
        </Button>
      </div>
    </form>
  );
}