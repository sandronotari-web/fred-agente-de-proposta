'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function IntakePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [transcricao, setTranscricao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [nomeProjeto, setNomeProjeto] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/projetos/${params.id}`);
        const data = await res.json();
        if (data.data) {
          setTranscricao(data.data.transcricao || '');
          setObservacoes(data.data.observacoes || '');
          setNomeProjeto(data.data.nomeProjeto || '');
        }
      } catch { /* ignore */ } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/projetos/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcricao, observacoes, nomeProjeto }),
      });
      router.push(`/projetos/${params.id}/dashboard`);
    } catch { /* ignore */ } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-400">Carregando...</div>;
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href={`/projetos/${params.id}/dashboard`} className="text-slate-400 hover:text-slate-600 text-sm">← Voltar</Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-2">Editar Intake</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome do projeto</label>
          <input
            type="text"
            value={nomeProjeto}
            onChange={(e) => setNomeProjeto(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Transcrição da reunião
          </label>
          <textarea
            value={transcricao}
            onChange={(e) => setTranscricao(e.target.value)}
            rows={12}
            placeholder="Cole aqui a transcrição completa da reunião..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <p className="text-xs text-slate-400 mt-1">{transcricao.length} caracteres</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Observações do closer
          </label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={5}
            placeholder="Promessa comercial, expectativas, urgência, riscos percebidos..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-primary-600 text-white text-sm rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-60"
          >
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <Link
            href={`/projetos/${params.id}/dashboard`}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}
