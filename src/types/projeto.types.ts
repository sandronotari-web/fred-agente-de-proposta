import type { Cliente } from './cliente.types';
import type { Diagnostico } from './analise.types';
import type { LRPConteudo } from './lRP.types';

export type ProjetoStatus = 'draft' | 'intake' | 'analise' | 'revisao' | 'publicado';

export interface ServicoVendido {
  produtoId: string;
  nome: string;
  escopo: string;
}

export interface Projeto {
  id: string;
  slug: string;
  clienteId: string;
  cliente?: Cliente;
  nomeProjeto: string;
  status: ProjetoStatus;
  transcricao?: string;
  servicosVendidos: ServicoVendido[];
  observacoes?: string;
  diagnostico?: Diagnostico;
  lrpConteudo?: LRPConteudo;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjetoInput {
  clienteId: string;
  nomeProjeto: string;
}

export interface UpdateProjetoInput {
  nomeProjeto?: string;
  transcricao?: string;
  servicosVendidos?: ServicoVendido[];
  observacoes?: string;
  diagnostico?: Diagnostico;
  lrpConteudo?: LRPConteudo;
  status?: ProjetoStatus;
}

export interface ListProjetosQuery {
  status?: ProjetoStatus;
  search?: string;
  limit?: number;
  offset?: number;
}