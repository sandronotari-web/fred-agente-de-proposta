import { z } from 'zod';

export const analiseSkillSchema = z.object({
  nivelDor: z.number().min(1).max(10),
  comentario: z.string(),
  recomendacoes: z.array(z.string()),
  servicosIndicados: z.array(z.string()),
});

export const diagnosticoSchema = z.object({
  sdrAnalyst: analiseSkillSchema,
  socialMediaAnalyst: analiseSkillSchema,
  webDesignerAnalyst: analiseSkillSchema,
  brandingAnalyst: analiseSkillSchema,
  sintomas: z.array(z.string()),
  riscos: z.array(z.string()),
  oportunidades: z.array(z.string()),
  proximosPassos: z.array(z.string()),
  materiaisNecessarios: z.array(z.string()),
  dataGeracao: z.date().optional(),
});

export type AnaliseSkillFormData = z.infer<typeof analiseSkillSchema>;
export type DiagnosticoFormData = z.infer<typeof diagnosticoSchema>;