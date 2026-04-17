'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface CardPlanoProps {
  plano: {
    agora: string[];
    acesso: string[];
    aprovacao: string[];
  };
}

export function CardPlano({ plano }: CardPlanoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano Operacional</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-green-700 mb-2">O que começa agora</p>
            <div className="space-y-1">
              {plano.agora?.length > 0 ? (
                plano.agora.map((item, i) => (
                  <p key={i} className="text-sm bg-green-50 px-3 py-2 rounded">• {item}</p>
                ))
              ) : (
                <p className="text-sm text-slate-400">—</p>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-yellow-700 mb-2">O que depende de acesso</p>
            <div className="space-y-1">
              {plano.acesso?.length > 0 ? (
                plano.acesso.map((item, i) => (
                  <p key={i} className="text-sm bg-yellow-50 px-3 py-2 rounded">• {item}</p>
                ))
              ) : (
                <p className="text-sm text-slate-400">—</p>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-red-700 mb-2">O que depende de aprovação</p>
            <div className="space-y-1">
              {plano.aprovacao?.length > 0 ? (
                plano.aprovacao.map((item, i) => (
                  <p key={i} className="text-sm bg-red-50 px-3 py-2 rounded">• {item}</p>
                ))
              ) : (
                <p className="text-sm text-slate-400">—</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}