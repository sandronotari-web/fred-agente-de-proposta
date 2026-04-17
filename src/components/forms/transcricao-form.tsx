'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

interface TranscricaoFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function TranscricaoForm({ value, onChange }: TranscricaoFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="transcricao">Transcrição da Reunião</Label>
        <p className="text-sm text-slate-500 mb-2">
          Cole a transcrição da reunión ou escreva os pontos principais discutidos.
        </p>
        <Textarea
          id="transcricao"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Discussão sobre necessidades do cliente..."
          rows={10}
          className="font-mono text-sm"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Dicas para transcrição</CardTitle>
          <CardDescription>
            Inclua: dores mencionadas, objetivos, budgets discutidos, concorrentes citados, próximos passos mencionados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li>Foque nas necessidades e desejos do cliente</li>
            <li>Note valores mencionados</li>
            <li>Identify próximos passos combinados</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}