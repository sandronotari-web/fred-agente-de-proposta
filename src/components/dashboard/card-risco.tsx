'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Badge } from '@/components/ui';

interface CardRiscoProps {
  riscos: {
    tipo: string;
    ativo: boolean;
    observacao?: string;
  }[];
}

const LISTA_RISCOS = [
  { key: 'expectativa_alta', label: 'Cliente com expectativa alta' },
  { key: 'desalinhamento', label: 'Desalinhamento entre promessa e entrega' },
  { key: 'material', label: 'Dependência de material' },
  { key: 'prazo', label: 'Prazo sensível' },
  { key: 'decisores', label: 'Múltiplos decisores' },
];

export function CardRisco({ riscos = [] }: CardRiscoProps) {
  const isAtivo = (tipo: string) => {
    const found = riscos.find(r => r.tipo === tipo);
    return found?.ativo || false;
  };

  const getObs = (tipo: string) => {
    const found = riscos.find(r => r.tipo === tipo);
    return found?.observacao || '';
  };

  const ativosCount = riscos.filter(r => r.ativo).length;
  const nivelRisco = ativosCount >= 3 ? 'error' : ativosCount >= 1 ? 'warning' : 'success';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Risco Comercial</CardTitle>
          <Badge variant={nivelRisco}>
            {ativosCount} risco{ativosCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {LISTA_RISCOS.map(risco => {
            const ativo = isAtivo(risco.key);
            const obs = getObs(risco.key);
            
            return (
              <div key={risco.key} className={`p-3 rounded border ${ativo ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ativo}
                    readOnly
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${ativo ? 'font-medium' : 'text-slate-500'}`}>
                    {risco.label}
                  </span>
                </div>
                {ativo && obs && (
                  <p className="text-xs text-slate-600 mt-1 ml-6">{obs}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}