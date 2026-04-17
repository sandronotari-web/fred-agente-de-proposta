'use client';

interface TopbarProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div>
        {title && <h1 className="text-lg font-semibold text-slate-900">{title}</h1>}
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
