'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface ProblemaItem {
  skill: string;
  nivel: number;
  problema: string;
}

interface CardProblemasProps {
  problemas: ProblemaItem[];
}

const SKILLS = [
  { key: 'posicionamento', label: 'Posicionamento' },
  { key: 'redes', label: 'Redes Sociais' },
  { key: 'site', label: 'Site' },
  { key: 'comercial', label: 'Comercial' },
  { key: 'autoridade', label: 'Autoridade' },  
  { key: 'captacao', label: 'Captação' },
];

export function CardProblemas({ problemas = [] }: CardProblemasProps) {
  const getNivel = (skill: string) => {
    const found = problemas.find(p => p.skill === skill);
    return found?.nivel || 0;
  };

  const getProblema = (skill: string) => {
    const found = problemas.find(p => p.skill === skill);
    return found?.problema || '';
  };

  const getNivelColor = (nivel: number) => {
    if (nivel >= 8) return 'bg-red-100 text-red-800';
    if (nivel >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problemas Detectados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {SKILLS.map(skill => {
            const nivel = getNivel(skill.key);
            const problema = getProblema(skill.key);
            
            return (
              <div key={skill.key} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${getNivelColor(nivel)}`}>
                  {nivel || '—'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{skill.label}</p>
                  <p className="text-sm text-slate-600">{problema || 'Sem problemas detectados'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}