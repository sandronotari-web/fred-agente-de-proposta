import { callAIWithJson } from '@/lib/ai';
import { SYSTEM_PROMPTS } from '@/lib/prompts';
import { buildSDRPrompt } from '@/prompts/sdr.prompt';
import { buildSocialPrompt } from '@/prompts/social.prompt';
import { buildWebPrompt } from '@/prompts/web.prompt';
import { buildDesignPrompt } from '@/prompts/design.prompt';
import { buildSynthesisPrompt } from '@/prompts/synthesis.prompt';
import { normalizeDiagnosis } from '@/lib/parser';

export interface AnalysisInput {
  transcricao: string;
  servicos: string[];
}

export interface SkillAnalysis {
  nivelDor: number;
  comentario: string;
  recomendacoes: string[];
  servicosIndicados: string[];
}

export interface FullDiagnosis {
  sdrAnalyst: SkillAnalysis;
  socialMediaAnalyst: SkillAnalysis;
  webDesignerAnalyst: SkillAnalysis;
  brandingAnalyst: SkillAnalysis;
  sintomas: string[];
  riscos: string[];
  oportunidades: string[];
  proximosPassos: string[];
  materiaisNecessarios: string[];
  dataGeracao: Date;
}

export class MeetingAnalysisService {
  async analyzeMeeting(input: AnalysisInput): Promise<FullDiagnosis> {
    const { transcricao, servicos } = input;

    const [sdr, social, web, branding] = await Promise.all([
      callAIWithJson<SkillAnalysis>(
        buildSDRPrompt(transcricao, servicos),
        SYSTEM_PROMPTS.sdr
      ),
      callAIWithJson<SkillAnalysis>(
        buildSocialPrompt(transcricao, servicos),
        SYSTEM_PROMPTS.social
      ),
      callAIWithJson<SkillAnalysis>(
        buildWebPrompt(transcricao, servicos),
        SYSTEM_PROMPTS.web
      ),
      callAIWithJson<SkillAnalysis>(
        buildDesignPrompt(transcricao, servicos),
        SYSTEM_PROMPTS.branding
      ),
    ]);

    const diagnosis = await callAIWithJson<unknown>(
      buildSynthesisPrompt(transcricao, servicos, {
        sdr: sdr as unknown as Record<string, unknown>,
        social: social as unknown as Record<string, unknown>,
        web: web as unknown as Record<string, unknown>,
        branding: branding as unknown as Record<string, unknown>,
      }),
      SYSTEM_PROMPTS.synthesis
    );

    return normalizeDiagnosis(diagnosis as unknown as Record<string, unknown>) as unknown as FullDiagnosis;
  }

  async analyzeSingleSkill(
    skill: 'sdr' | 'social' | 'web' | 'branding',
    input: AnalysisInput
  ): Promise<SkillAnalysis> {
    const { transcricao, servicos } = input;

    const prompts = {
      sdr: { prompt: buildSDRPrompt, system: SYSTEM_PROMPTS.sdr },
      social: { prompt: buildSocialPrompt, system: SYSTEM_PROMPTS.social },
      web: { prompt: buildWebPrompt, system: SYSTEM_PROMPTS.web },
      branding: { prompt: buildDesignPrompt, system: SYSTEM_PROMPTS.branding },
    };

    return callAIWithJson<SkillAnalysis>(
      prompts[skill].prompt(transcricao, servicos),
      prompts[skill].system
    );
  }
}

export const meetingAnalysisService = new MeetingAnalysisService();