import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface AIResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export async function callAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: prompt,
    },
  ];

  const response = await anthropic.messages.create({
    model: process.env.AI_MODEL || 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    system: systemPrompt || 'Você é um assistente especializado em análise de negócios e diagnóstico de marketing.',
    messages,
  });

  const content = response.content[0];
  if (content.type === 'text') {
    return {
      content: content.text,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  }

  throw new Error('Resposta inválida do modelo');
}

export async function callAIWithJson<T>(prompt: string, systemPrompt?: string): Promise<T> {
  const fullSystem = `${systemPrompt || 'Você é um assistente.'}

Muito importante: Responda APENAS com JSON válido, sem texto adicional. Não use markdown, não use explicações, apenas JSON.`;

  const result = await callAI(prompt, fullSystem);
  
  try {
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T;
    }
    return JSON.parse(result.content) as T;
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', result.content);
    throw new Error('Resposta do AI não é JSON válido');
  }
}

export default { callAI, callAIWithJson };