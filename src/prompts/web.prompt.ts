export function buildWebPrompt(transcricao: string, servicos: string[]): string {
  return `Analise a seguinte transcrição de reunião do ponto de vista de Web Designer:

TRANSCRIÇÃO:
${transcricao}

SERVIÇOS CONTRATADOS:
${servicos.join(', ')}

Analise e retorne JSON com:
{
  "nivelDor": número de 1-10,
  "comentario": "análise em português",
  "recomendacoes": ["lista de recomendações"],
  "servicosIndicados": ["serviços do catálogo"]
}

Responda apenas com JSON válido.`;
}