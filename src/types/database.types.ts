export interface ProjetoWithRelations {
  id: string;
  slug: string;
  clienteId: string;
  nomeProjeto: string;
  status: string;
  transcricao?: string | null;
  observacoes?: string | null;
  diagnosticoJson?: string | null;
  lrpConteudoJson?: string | null;
  createdAt: Date;
  updatedAt: Date;
  cliente?: { id: string; nome: string; empresa: string; email: string; telefone?: string | null };
  servicosVendidos?: { id: string; projetoId: string; produtoId?: string | null; nome: string; escopo: string }[];
}

export interface DashboardStats {
  totalProjetos: number;
  projetosEmIntake: number;
  projetosEmAnalise: number;
  projetosEmRevisao: number;
  projetosPublicados: number;
}
