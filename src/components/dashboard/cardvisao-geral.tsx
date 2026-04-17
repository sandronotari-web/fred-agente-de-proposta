'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Badge } from '@/components/ui';

interface CardVisaoGeralProps {
  projeto: {
    nomeProjeto: string;
    cliente: {
      nome: string;
      empresa: string;
      email: string;
      telefone?: string;
    };
    servicosVendidos: { nome: string; escopo: string }[];
  };
  dados?: {
    segmento?: string;
    objetivoPrincipal?: string;
    urgencia?: 'baixa' | 'media' | 'alta' | 'critica';
    ticket?: string;
  };
}

export function CardVisaoGeral({ projeto, dados }: CardVisaoGeralProps) {
  const urgenciaVariante = {
    baixa: 'success',
    media: 'warning',
    alta: 'error',
    critica: 'error',
  } as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Cliente</p>
            <p className="font-medium">{projeto.cliente?.nome}</p>
            <p className="text-sm text-slate-600">{projeto.cliente?.empresa}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500">Segmento</p>
            <p className="font-medium">{dados?.segmento || '—'}</p>
          </div>
          
          <div className="col-span-2">
            <p className="text-sm text-slate-500">Objetivo Principal</p>
            <p className="font-medium">{dados?.objetivoPrincipal || '—'}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500">Urgência</p>
            <Badge variant={dados?.urgencia ? urgenciaVariante[dados.urgencia] : 'outline'}>
              {dados?.urgencia || '—'}
            </Badge>
          </div>
          
          <div>
            <p className="text-sm text-slate-500">Ticket</p>
            <p className="font-medium">{dados?.ticket || '—'}</p>
          </div>
          
          <div className="col-span-2">
            <p className="text-sm text-slate-500">Escopo</p>
            <div className="space-y-1 mt-1">
              {projeto.servicosVendidos?.length > 0 ? (
                projeto.servicosVendidos.map((s, i) => (
                  <p key={i} className="text-sm">• {s.nome}</p>
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