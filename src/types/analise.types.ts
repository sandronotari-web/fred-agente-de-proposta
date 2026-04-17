export interface AnaliseSkill {
  nivelDor: number;
  comentario: string;
  recomendacoes: string[];
  servicosIndicados: string[];
}

export interface Diagnostico {
  sdrAnalyst: AnaliseSkill;
  socialMediaAnalyst: AnaliseSkill;
  webDesignerAnalyst: AnaliseSkill;
  brandingAnalyst: AnaliseSkill;
  sintomas: string[];
  riscos: string[];
  oportunidades: string[];
  proximosPassos: string[];
  materiaisNecessarios: string[];
  dataGeracao?: Date;
}