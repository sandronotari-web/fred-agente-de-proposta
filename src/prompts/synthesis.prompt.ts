export function buildSynthesisPrompt(
  transcricao: string,
  servicos: string[],
  analises: {
    sdr: Record<string, unknown>;
    social: Record<string, unknown>;
    web: Record<string, unknown>;
    branding: Record<string, unknown>;
  }
): string {
  return `Consolide as análises dos 4 departamentos em um diagnóstico unificado:

TRANSCRIÇÃO:
${transcricao}

SERVIÇOS CONTRATADOS:
${servicos.join(', ')}

ANÁLISE SDR:
${JSON.stringify(analises.sdr)}

ANÁLISE SOCIAL:
${JSON.stringify(analises.social)}

ANÁLISE WEB:
${JSON.stringify(analises.web)}

ANÁLISE BRANDING:
${JSON.stringify(analises.branding)}

Consolide e retorne JSON com:
{
  "sdrAnalyst": {...},
  "socialMediaAnalyst": {...},
  "webDesignerAnalyst": {...},
  "brandingAnalyst": {...},
  "sintomas": ["sintomas identificados"],
  "riscos": ["riscos comerciais"],
  "oportunidades": ["oportunidades de upsell"],
  "proximosPassos": ["próximos passos"],
  "materiaisNecessarios": ["materiais que o cliente precisa fornecer"]
}

Responda apenas com JSON válido.`;
}