import type { ServicoVendido } from './projeto.types';

export type Impacto = 'alto' | 'medio' | 'baixo';

export interface Prioridade {
  titulo: string;
  descricao: string;
  impacto: Impacto;
}

export interface ExplicacaoServico {
  nome: string;
  descricao: string;
  beneficios: string[];
}

export interface CronogramaItem {
  fase: string;
  descricao: string;
  duracaoSemanas: number;
}

export interface LRPConteudo {
  hero: {
    titulo: string;
    subtitulo: string;
  };
  contexto: string;
  pontosObservados: string[];
  prioridades: Prioridade[];
  escopoContratado: ServicoVendido[];
  explicacaoServicos: ExplicacaoServico[];
  cronograma: CronogramaItem[];
  materiaisNecessarios: string[];
  proximosPassos: string[];
  dataGeracao?: Date;
}