'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';

interface ObservacoesFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function ObservacoesForm({ value, onChange }: ObservacoesFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="observacoes">Observações do Closer</Label>
        <p className="text-sm text-slate-500 mb-2">
          Observações internas sobre o cliente, negotiation, objeções, etc. (não será exibido na LRP)
        </p>
        <Textarea
          id="observacoes"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Notas sobre o cliente, objeções superadas, acordos especiais..."
          rows={8}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">O que incluir aqui</CardTitle>
          <CardDescription>
            Este campo é 仅 para uso interno.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li>Objeções mencionadas pelo cliente</li>
            <li>Valor combinado ou discounts dados</li>
            <li>Informações sobre o decision maker</li>
            <li>Detalhes da negociação</li>
            <li>Próximos passos combinado</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}