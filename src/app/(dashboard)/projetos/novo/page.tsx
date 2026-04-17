'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClienteForm } from '@/components/forms/cliente-form';
import { TranscricaoForm } from '@/components/forms/transcricao-form';
import { ServicosForm } from '@/components/forms/servicos-form';
import { ObservacoesForm } from '@/components/forms/observacoes-form';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Cliente',       hint: 'Dados do cliente e empresa' },
  { id: 2, label: 'Reunião',       hint: 'Transcrição da call' },
  { id: 3, label: 'Serviços',      hint: 'O que foi vendido' },
  { id: 4, label: 'Observações',   hint: 'Notas internas do closer' },
];

interface ServicoItem {
  produtoId: string;
  produtoNome: string;
  escopo: string;
}

export default function NovoProjetoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [cliente, setCliente] = useState({ nome: '', empresa: '', email: '', telefone: '' });
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [transcricao, setTranscricao] = useState('');
  const [servicos, setServicos] = useState<ServicoItem[]>([]);
  const [observacoes, setObservacoes] = useState('');

  const handleClienteChange = (field: string, value: string) => {
    setCliente((prev) => ({ ...prev, [field]: value }));
    if (field === 'empresa' && !nomeProjeto) setNomeProjeto(value);
  };

  const canAdvance = () => {
    if (step === 1) return !!(cliente.nome && cliente.empresa && cliente.email);
    if (step === 2) return transcricao.trim().length > 50;
    if (step === 3) return servicos.length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeProjeto: nomeProjeto || cliente.empresa, ...cliente }),
      });
      const { data: projeto } = await res.json();

      if (!projeto?.id) throw new Error('Erro ao criar projeto');

      await fetch(`/api/projetos/${projeto.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcricao,
          observacoes,
          servicosVendidos: servicos.map((s) => ({
            produtoId: s.produtoId,
            nome: s.produtoNome,
            escopo: s.escopo,
          })),
        }),
      });

      router.push(`/projetos/${projeto.id}/dashboard`);
    } catch {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <p className="text-lg font-semibold text-slate-900">Criando projeto...</p>
          <p className="text-slate-400 text-sm mt-1">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">
              <Link href="/dashboard" className="hover:text-slate-600">Projetos</Link> ›
            </p>
            <h1 className="text-xl font-bold text-slate-900">Novo Projeto</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-600">
            Cancelar
          </Link>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-slate-100 px-8 py-4">
        <div className="flex items-center gap-0">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => s.id < step && setStep(s.id)}
                className={cn(
                  'flex items-center gap-2.5 transition-colors',
                  s.id < step ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all',
                  s.id < step  ? 'bg-emerald-500 text-white' :
                  s.id === step ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                                  'bg-slate-200 text-slate-400'
                )}>
                  {s.id < step ? '✓' : s.id}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={cn('text-xs font-semibold', s.id === step ? 'text-slate-900' : s.id < step ? 'text-slate-600' : 'text-slate-300')}>
                    {s.label}
                  </p>
                  <p className="text-xs text-slate-400">{s.hint}</p>
                </div>
              </button>
              {i < steps.length - 1 && (
                <div className={cn('flex-1 h-px mx-4', s.id < step ? 'bg-emerald-300' : 'bg-slate-200')} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="p-8 max-w-3xl">
        <div className="bg-white border border-slate-200 rounded-2xl p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">{steps[step - 1].label}</h2>
            <p className="text-sm text-slate-500">{steps[step - 1].hint}</p>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome do projeto</label>
                <input
                  type="text"
                  value={nomeProjeto}
                  onChange={(e) => setNomeProjeto(e.target.value)}
                  placeholder="Ex: Floricultura Bella — Onboarding"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-slate-400 mt-1">Opcional — usará o nome da empresa se em branco</p>
              </div>
              <ClienteForm {...cliente} onChange={handleClienteChange} />
            </div>
          )}

          {step === 2 && <TranscricaoForm value={transcricao} onChange={setTranscricao} />}
          {step === 3 && <ServicosForm servicos={servicos} onChange={setServicos} />}
          {step === 4 && <ObservacoesForm value={observacoes} onChange={setObservacoes} />}

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Voltar
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Próximo →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Criar projeto e gerar diagnóstico →
              </button>
            )}
          </div>
        </div>

        {/* Step hint */}
        {step === 2 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
            <strong>Dica:</strong> Cole a transcrição completa. Quanto mais detalhada, melhor o diagnóstico da IA.
          </div>
        )}
        {step === 4 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-700">
            <strong>Uso interno:</strong> Estas observações não aparecerão na LRP do cliente.
          </div>
        )}
      </div>
    </div>
  );
}
