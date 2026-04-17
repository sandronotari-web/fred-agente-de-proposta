import { z } from 'zod';

export const produtoSchema = z.object({
  productKey: z.string().min(1, 'Product key é obrigatório'),
  productName: z.string().min(1, 'Nome do produto é obrigatório'),
  shortDescription: z.string().min(1, 'Descrição curta é obrigatória'),
  fullDescription: z.string().min(1, 'Descrição completa é obrigatória'),
  idealFor: z.array(z.string()).default([]),
  mainPainsSolved: z.array(z.string()).default([]),
  deliverablesJson: z.array(z.string()).default([]),
  differentialsJson: z.array(z.string()).default([]),
  priorityRulesJson: z.array(z.string()).default([]),
});

export type ProdutoFormData = z.infer<typeof produtoSchema>;

export interface Produto {
  id: string;
  productKey: string;
  productName: string;
  shortDescription: string;
  fullDescription: string;
  idealFor: string[];
  mainPainsSolved: string[];
  deliverablesJson: string[];
  differentialsJson: string[];
  priorityRulesJson: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function parseProduto(raw: Record<string, unknown>): Produto {
  return {
    ...raw,
    idealFor: parseJsonArray(raw.idealFor as string),
    mainPainsSolved: parseJsonArray(raw.mainPainsSolved as string),
    deliverablesJson: parseJsonArray(raw.deliverablesJson as string),
    differentialsJson: parseJsonArray(raw.differentialsJson as string),
    priorityRulesJson: parseJsonArray(raw.priorityRulesJson as string),
  } as Produto;
}

function parseJsonArray(val: string | string[]): string[] {
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val || '[]'); } catch { return []; }
}