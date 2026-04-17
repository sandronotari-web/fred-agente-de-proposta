'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Projetos', icon: '📋' },
  { href: '/biblioteca', label: 'Portfólio', icon: '📦' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-slate-900 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">V4</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Delivery</p>
            <p className="text-slate-400 text-xs">Intelligence</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link
          href="/projetos/novo"
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <span className="text-base">+</span> Novo Projeto
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <p className="text-slate-500 text-xs text-center">V4 Company © 2025</p>
      </div>
    </aside>
  );
}
