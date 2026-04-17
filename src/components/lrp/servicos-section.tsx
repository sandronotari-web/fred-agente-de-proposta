'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Servico {
  nome: string;
  descricao: string;
  beneficios: string[];
}

interface ServicosSectionProps {
  servicos: Servico[];
  onChange: (servicos: Servico[]) => void;
  editable?: boolean;
}

export function ServicosSection({ servicos = [], onChange, editable = true }: ServicosSectionProps) {
  const addServico = () => {
    onChange([...servicos, { nome: '', descricao: '', beneficios: [] }]);
  };

  const updateServico = (index: number, field: keyof Servico, value: string | string[]) => {
    const updated = [...servicos];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeServico = (index: number) => {
    onChange(servicos.filter((_, i) => i !== index));
  };

  if (!editable) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Serviços</h2>
        {servicos.length === 0 ? (
          <p className="text-slate-500">Nenhum serviço definido.</p>
        ) : (
          <div className="space-y-4">
            {servicos.map((s, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-medium mb-2">{s.nome}</h3>
                <p className="text-sm text-slate-600 mb-2">{s.descricao}</p>
                {s.beneficios.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">Benefícios:</p>
                    <ul className="text-sm">
                      {s.beneficios.map((b, j) => (
                        <li key={j}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <Label>Serviços</Label>
      <div className="space-y-3 mb-3">
        {servicos.map((s, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <div className="flex gap-2 mb-2">
              <Input
                value={s.nome}
                onChange={(e) => updateServico(i, 'nome', e.target.value)}
                placeholder="Nome do serviço"
                className="flex-1"
              />
              <Button variant="ghost" size="sm" onClick={() => removeServico(i)}>×</Button>
            </div>
            <Textarea
              value={s.descricao}
              onChange={(e) => updateServico(i, 'descricao', e.target.value)}
              placeholder="Descrição do serviço"
              rows={2}
            />
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addServico}>+ Adicionar Serviço</Button>
    </div>
  );
}