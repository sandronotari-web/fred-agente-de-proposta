'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { Textarea } from '@/components/ui';
import type { Produto } from '@/types/produto.types';

interface ServicoItem {
  produtoId: string;
  produtoNome: string;
  escopo: string;
}

interface ServicosFormProps {
  servicos: ServicoItem[];
  onChange: (servicos: ServicoItem[]) => void;
}

export function ServicosForm({ servicos, onChange }: ServicosFormProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch('/api/produtos');
        const data = await res.json();
        setProdutos(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);
  
  const isSelected = (produtoId: string) => servicos.some(s => s.produtoId === produtoId);
  
  const toggleServico = (produto: Produto) => {
    if (isSelected(produto.id)) {
      onChange(servicos.filter(s => s.produtoId !== produto.id));
    } else {
      onChange([...servicos, { produtoId: produto.id, produtoNome: produto.productName, escopo: '' }]);
    }
  };
  
  const updateEscopo = (produtoId: string, escopo: string) => {
    onChange(servicos.map(s => s.produtoId === produtoId ? { ...s, escopo } : s));
  };
  
  if (loading) {
    return <p>Carregando produtos...</p>;
  }
  
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-500 mb-2">
          Selecione os serviços contratados e defina o escopo de cada um.
        </p>
      </div>
      
      {produtos.map((produto) => {
        const selected = isSelected(produto.id);
        const isExpanded = expandedId === produto.id;
        
        return (
          <Card key={produto.id} className={selected ? 'border-primary-300 bg-primary-50' : ''}>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={produto.id}
                    checked={selected}
                    onChange={() => toggleServico(produto)}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <div>
                    <CardTitle className="text-base">{produto.productName}</CardTitle>
                    <p className="text-sm text-slate-500">{produto.shortDescription}</p>
                  </div>
                </div>
                {selected && (
                  <Badge variant="success">Selecionado</Badge>
                )}
              </div>
            </CardHeader>
            
            {selected && (
              <CardContent className="pt-0">
                <div>
                  <label className="text-sm font-medium block mb-1">Escopo do serviço</label>
                  <Textarea
                    value={servicos.find(s => s.produtoId === produto.id)?.escopo || ''}
                    onChange={(e) => updateEscopo(produto.id, e.target.value)}
                    placeholder="Descreva o escopo contratado para este serviço..."
                    rows={3}
                  />
                </div>
                {produto.deliverablesJson && produto.deliverablesJson.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-slate-500 mb-1">Entregáveis típicos:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {produto.deliverablesJson.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}