'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';
import { ProdutoForm } from '@/components/forms/produto-form';
import type { Produto, ProdutoFormData } from '@/schemas/produto.schema';

export default function BibliotecaPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [search, setSearch] = useState('');

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

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (data: ProdutoFormData) => {
    try {
      const url = editingProduto ? `/api/produtos/${editingProduto.id}` : '/api/produtos';
      const method = editingProduto ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      setShowForm(false);
      setEditingProduto(null);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto: Produto) => {
    setEditingProduto(produto);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const filteredProdutos = produtos.filter(
    (p) =>
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.productKey.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Biblioteca de Produtos</h1>
            <p className="text-slate-600">Base de produtos e serviços</p>
          </div>
          <Button onClick={() => { setShowForm(true); setEditingProduto(null); }}>
            + Novo Produto
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingProduto ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
              <CardDescription>
                {editingProduto ? 'Atualize os dados do produto' : 'Cadastre um novo produto na biblioteca'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProdutoForm
                initialData={editingProduto || undefined}
                onSubmit={handleSubmit}
                isLoading={loading}
              />
              <Button
                variant="ghost"
                onClick={() => { setShowForm(false); setEditingProduto(null); }}
                className="mt-4"
              >
                Cancelar
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-slate-500">Carregando...</p>
            ) : filteredProdutos.length === 0 ? (
              <p className="text-slate-500">Nenhum produto encontrado.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Product Key</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Produto</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Descrição</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProdutos.map((produto) => (
                      <tr key={produto.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                            {produto.productKey}
                          </code>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {produto.productName}
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {produto.shortDescription}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={produto.isActive ? 'success' : 'outline'}>
                            {produto.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(produto)}
                          >
                           Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(produto.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}