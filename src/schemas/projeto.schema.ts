import { z } from 'zod';

export const clienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  empresa: z.string().min(1, 'Empresa é obrigatória'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
});

export const servicoVendidoSchema = z.object({
  produtoId: z.string().min(1, 'Produto é obrigatório'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  escopo: z.string().min(1, 'Escopo é obrigatório'),
});

export const projetoSchema = z.object({
  clienteId: z.string().min(1, 'Cliente é obrigatório'),
  nomeProjeto: z.string().min(1, 'Nome do projeto é obrigatório'),
});

export const projetoIntakeSchema = projetoSchema.extend({
  transcricao: z.string().optional(),
  servicosVendidos: z.array(servicoVendidoSchema).default([]),
  observacoes: z.string().optional(),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;
export type ServicoVendidoFormData = z.infer<typeof servicoVendidoSchema>;
export type ProjetoFormData = z.infer<typeof projetoSchema>;
export type ProjetoIntakeFormData = z.infer<typeof projetoIntakeSchema>;