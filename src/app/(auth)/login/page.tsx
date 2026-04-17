'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500));

    if (email === 'admin@v4company.com' && senha === 'v4admin') {
      router.push('/dashboard');
    } else {
      setError('Email ou senha incorretos.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-black text-xl">V4</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Delivery Intelligence</h1>
          <p className="text-slate-400 text-sm mt-1">Sistema interno V4 Company</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Entrar na plataforma</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@v4company.com"
                required
                className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 font-medium mb-1">Credenciais de acesso:</p>
            <p className="text-xs text-slate-600">Email: <code>admin@v4company.com</code></p>
            <p className="text-xs text-slate-600">Senha: <code>v4admin</code></p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-slate-400 text-sm hover:text-white transition-colors">
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
