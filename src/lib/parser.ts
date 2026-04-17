export function parseAIResponse<T>(content: string): T {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T;
    }
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('Parse error:', content);
    throw new Error('Invalid JSON from AI response');
  }
}

export function extractJsonFromText(text: string): string {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? jsonMatch[0] : text;
}

export function sanitizeJsonString(str: string): string {
  return str
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']')
    .replace(/"\s+"/g, '","')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

export function parseArrayField(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(v => String(v));
  }
  if (typeof value === 'string') {
    return value.split('\n').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

export interface DiagnosisResult {
  nivelDor: number;
  comentario: string;
  recomendacoes: string[];
  servicosIndicados: string[];
}

export function normalizeDiagnosisField(field: unknown): DiagnosisResult {
  if (typeof field === 'object' && field !== null) {
    const f = field as Record<string, unknown>;
    return {
      nivelDor: Number(f.nivelDor) || 5,
      comentario: String(f.comentario || ''),
      recomendacoes: parseArrayField(f.recomendacoes),
      servicosIndicados: parseArrayField(f.servicosIndicados),
    };
  }
  return {
    nivelDor: 5,
    comentario: '',
    recomendacoes: [],
    servicosIndicados: [],
  };
}

export function normalizeDiagnosis(data: unknown): Record<string, unknown> {
  if (typeof data !== 'object' || data === null) {
    return {};
  }
  
  const d = data as Record<string, unknown>;
  return {
    sdrAnalyst: normalizeDiagnosisField(d.sdrAnalyst),
    socialMediaAnalyst: normalizeDiagnosisField(d.socialMediaAnalyst),
    webDesignerAnalyst: normalizeDiagnosisField(d.webDesignerAnalyst),
    brandingAnalyst: normalizeDiagnosisField(d.brandingAnalyst),
    sintomas: parseArrayField(d.sintomas),
    riscos: parseArrayField(d.riscos),
    oportunidades: parseArrayField(d.oportunidades),
    proximosPassos: parseArrayField(d.proximosPassos),
    materiaisNecessarios: parseArrayField(d.materiaisNecessarios),
    dataGeracao: new Date(),
  };
}