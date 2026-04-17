'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Badge } from '@/components/ui';

interface CardUpsellProps {
  oportunidades: {
    tipo: string;
    ativo: boolean;
    observacao?: string;
  }[];
}

const LISTA_UPSELLS = [
  { key: 'branding', label: 'Branding' },
  { key: 'site_novo', label: 'Site Novo' },
  { key: 'crm', label: 'CRM' },
  { key: 'automacao', label: 'Automação' },
  { key: 'inbound', label: 'Inbound' },
  { key: 'performance', label: 'Performance Adicional' },
];

export function CardUpsell({ oportunidades = [] }: CardUpsellProps) {
  const isAtivo = (tipo: string) => {
    const found = oportunidades.find(o => o.tipo === tipo);
    return found?.ativo || false;
  };

  const getObs = (tipo: string) => {
    const found = oportunidades.find(o => o.tipo === tipo);
    return found?.observacao || '';
  };

  const ativosCount = oportunidades.filter(o => o.ativo).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Oportunidade de Upsell</CardTitle>
          <Badge variant={ativosCount > 0 ? 'success' : 'outline'}>
            {ativosCount} opportunity{ativosCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {LISTA_UPSELLS.map(upsell => {
            const ativo = isAtivo(upsell.key);
            const obs = getObs(upsell.key);
            
            return (
              <div key={upsell.key} className={`p-3 rounded border ${ativo ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ativo}
                    readOnly
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${ativo ? 'font-medium text-green-800' : 'text-slate-500'}`}>
                    {upsell.label}
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