import { z } from 'zod';

export const prioridadeSchema = z.object({
  titulo: z.string().min(1),
  descricao: z.string(),
  impacto: z.enum(['alto', 'medio', 'baixo']),
});

export const explicacaoServicoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string(),
  beneficios: z.array(z.string()),
});

export const cronogramaItemSchema = z.object({
  fase: z.string().min(1),
  descricao: z.string(),
  duracaoSemanas: z.number().min(1),
});

export const heroSchema = z.object({
  titulo: z.string().min(1),
  subtitulo: z.string(),
});

export const lrpConteudoSchema = z.object({
  hero: heroSchema,
  contexto: z.string(),
  pontosObservados: z.array(z.string()),
  prioridades: z.array(prioridadeSchema),
  escopoContratado: z.array(z.object({
    produtoId: z.string(),
    nome: z.string(),
    escopo: z.string(),
  })),
  explicacaoServicos: z.array(explicacaoServicoSchema),
  cronograma: z.array(cronogramaItemSchema),
  materiaisNecessarios: z.array(z.string()),
  proximosPassos: z.array(z.string()),
  dataGeracao: z.date().optional(),
});

export type PrioridadeFormData = z.infer<typeof prioridadeSchema>;
export type ExplicacaoServicoFormData = z.infer<typeof explicacaoServicoSchema>;
export type CronogramaItemFormData = z.infer<typeof cronogramaItemSchema>;
export type HeroFormData = z.infer<typeof heroSchema>;
export type LRPConteudoFormData = z.infer<typeof lrpConteudoSchema>;