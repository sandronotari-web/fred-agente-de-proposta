'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClienteFormProps {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  onChange: (field: string, value: string) => void;
}

export function ClienteForm({ nome, empresa, email, telefone, onChange }: ClienteFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome do Cliente *</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => onChange('nome', e.target.value)}
            placeholder=" Nome completo ou empresa"
            required
          />
        </div>
        <div>
          <Label htmlFor="empresa">Empresa *</Label>
          <Input
            id="empresa"
            value={empresa}
            onChange={(e) => onChange('empresa', e.target.value)}
            placeholder="Nome da empresa"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="email@empresa.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => onChange('telefone', e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>
    </div>
  );
}