export interface Cliente {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClienteInput {
  nome: string;
  empresa: string;
  email: string;
  telefone?: string;
}

export interface UpdateClienteInput extends Partial<CreateClienteInput> {}