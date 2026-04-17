'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Sintoma {
  id: string;
  texto: string;
}

interface DiagnosticoManual {
  sintomas: Sintoma[];
  riscos: string[];
  oportunidades: string[];
  proximosPassos: string[];
  materiaisNecessarios: string[];
}

interface DiagnosticoFormProps {
  value: DiagnosticoManual;
  onChange: (value: DiagnosticoManual) => void;
}

export function DiagnosticoForm({ value, onChange }: DiagnosticoFormProps) {
  const addItem = (field: keyof DiagnosticoManual, text: string) => {
    if (!text.trim()) return;
    const newItem = { id: Date.now().toString(), texto: text };
    onChange({ ...value, [field]: [...value[field], newItem.texto] });
  };
  
  const removeItem = (field: keyof DiagnosticoManual, index: number) => {
    const updated = [...value[field]];
    updated.splice(index, 1);
    onChange({ ...value, [field]: updated });
  };
  
  const handleAddSintomo = (text: string) => {
    if (!text.trim()) return;
    onChange({ 
      ...value, 
      sintomas: [...value.sintomas, { id: Date.now().toString(), texto: text }]
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Diagnóstico Manual (Opcional)</CardTitle>
          <CardDescription>
            Preencha apenas se quiser adicionar um diagnóstico manual. Caso contrário, o diagnóstico será gerado automaticamente após o intake.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div>
        <Label>Sintomas Identificados</Label>
        <div className="space-y-2 mt-2">
          {value.sintomas.map((sintoma, index) => (
            <div key={sintoma.id} className="flex items-center gap-2">
              <span className="flex-1 bg-slate-100 px-3 py-2 rounded text-sm">{sintoma.texto}</span>
              <Button variant="ghost" size="sm" onClick={() => removeItem('sintomas', index)}>×</Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar sintoma..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddSintomo((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label>Riscos Identificados</Label>
        <div className="space-y-2 mt-2">
          {value.riscos.map((risco, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1 bg-red-50 text-red-800 px-3 py-2 rounded text-sm">{risco}</span>
              <Button variant="ghost" size="sm" onClick={() => removeItem('riscos', index)}>×</Button>
            </div>
          ))}
          <Input
            placeholder="Adicionar risco..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addItem('riscos', (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      </div>
      
      <div>
        <Label>Oportunidades Identificadas</Label>
        <div className="space-y-2 mt-2">
          {value.oportunidades.map((opp, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1 bg-green-50 text-green-800 px-3 py-2 rounded text-sm">{opp}</span>
              <Button variant="ghost" size="sm" onClick={() => removeItem('oportunidades', index)}>×</Button>
            </div>
          ))}
          <Input
            placeholder="Adicionar oportunidade..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addItem('oportunidades', (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      </div>
      
      <div>
        <Label>Próximos Passos</Label>
        <div className="space-y-2 mt-2">
          {value.proximosPassos.map((passo, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1 bg-blue-50 text-blue-800 px-3 py-2 rounded text-sm">{passo}</span>
              <Button variant="ghost" size="sm" onClick={() => removeItem('proximosPassos', index)}>×</Button>
            </div>
          ))}
          <Input
            placeholder="Adicionar próximo passo..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addItem('proximosPassos', (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}