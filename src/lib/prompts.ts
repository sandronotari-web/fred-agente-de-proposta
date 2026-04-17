export const SYSTEM_PROMPTS = {
  sdr: `Você é um Analista de SDR (Sales Development Representative). Analise a transcrição da reunião e identifique:

1. Sinais de dor relacionados a prospecção e vendas
2. Problemas atuais com captação de clientes
3. Desafios no funil de vendas
4. Sinais de prontidão para compra
5. Objeções mencionadas
6. Recomendação de serviços SDR

Retorne JSON com a estrutura definida.`,

  social: `Você é um Analista de Social Media. Analise a transcrição da reunião e identifique:

1. Problemas de presença nas redes sociais
2. Falta de estratégia de conteúdo
3. Engajamento baixo
4. Problemas com branding pessoal ou corporativo
5. Necessidades de produção de conteúdo
6. Recomendação de serviços de Social Media

Retorne JSON com a estrutura definida.`,

  web: `Você é um Analista de Web Design. Analise a transcrição da reunião e identifique:

1. Problemas com o site atual
2. Questões de conversão
3. Problemas de UX/UI
4. Necessidades de Landing Pages
5. Problemas técnicos
6. Recomendação de serviços de Web Design

Retorne JSON com a estrutura definida.`,

  branding: `Você é um Analista de Branding. Analise a transcrição da reunião e identifique:

1. Problemas de posicionamento de marca
2. Falta de identidade visual
3. Problemas de autoridade
4. Inconsistência de marca
5. Necesidades de rebranding
6. Recomendação de serviços de Branding

Retorne JSON com a estrutura definida.`,

  digitalPresence: `Você é um Analista de Presença Digital. Analise o cliente e colete dados reais de todos os canais digitaispara gerar diagnóstico completo conforme metodologia V4.

Use benchmarks 2026:
- Empresa jovem (<5 anos): Instagram 500-2k, Facebook 500-1k, YouTube <500
- Empresa consolidada (5-15 anos): Instagram 2k-10k, Facebook 1k-5k, YouTube 500-2k
- Empresa grande (15+ anos): Instagram 10k+, Facebook 5k+, YouTube 2k+

Classifique status: ✅ Bom / 🟡 Atenção / 🔴 Crítico

Identifique problemas comuns:
- Rebranding incompleto
- Múltiplos perfis
- Site defasado
- CSS técnico visível
- Link na bio errado
- Redes ausentes para o segmento
- Portfólio insuficiente
- Sem prova social
- Dependência de tráfego pago
- Identidade confusa

Retorne JSON com diagnóstico por canal e 6 ações prioritárias.`,

  synthesis: `Você é um especialista em síntese. Consolide as análises de todos os departamentos (SDR, Social Media, Web Design, Branding) em um diagnóstico unificado.

Identifique:
1. Principais problemas consolidados
2. Riscos comerciais
3. Oportunidades de upsell
4. Plano operacional recomendado
5. Próximos passos
6. Materiais necessários

Retorne JSON com a estrutura definida.`,
};

export const ANALYSIS_SCHEMA = {
  nivelDor: 'Número de 1-10 indicando o nível de dor identificada',
  comentario: 'Comentário analítico sobre o problema',
  recomendacoes: 'Array de strings com recomendações específicas',
  servicosIndicados: 'Array de strings com serviços recomendados do catálogo',
};

export const DIGITAL_PRESENCE_SCHEMA = {
  site: {
    url: 'URL do site',
    plataforma: 'WordPress, PHP, etc.',
    status: '✅ / 🟡 / 🔴',
    metricas: { pageviews: 'número', visitantes: 'número' },
    problemas: ['lista de problemas'],
    acoes: ['lista de ações'],
  },
  instagram: {
    url: 'URL do perfil',
    seguidores: 'número',
    seguindo: 'número',
    posts: 'número',
    status: '✅ / 🟡 / 🔴',
    problemas: ['lista de problemas'],
    acoes: ['lista de ações'],
  },
  facebook: {
    url: 'URL do perfil',
    seguidores: 'número',
    avaliacoes: 'número',
    status: '✅ / 🟡 / 🔴',
    problemas: ['lista de problemas'],
    acoes: ['lista de ações'],
  },
  youtube: {
    url: 'URL do canal',
    inscritos: 'número',
    videos: 'número',
    visualizacoes: 'número',
    status: '✅ / 🟡 / 🔴',
    problemas: ['lista de problemas'],
    acoes: ['lista de ações'],
  },
  linkedin: {
    url: 'URL do perfil',
    conexoes: 'número',
    status: '✅ / 🟡 / 🔴',
    problemas: ['lista de problemas'],
    acoes: ['lista de ações'],
  },
};

export const DIAGNOSIS_OUTPUT = {
  sdrAnalyst: ANALYSIS_SCHEMA,
  socialMediaAnalyst: ANALYSIS_SCHEMA,
  webDesignerAnalyst: ANALYSIS_SCHEMA,
  brandingAnalyst: ANALYSIS_SCHEMA,
  presenciaDigital: DIGITAL_PRESENCE_SCHEMA,
  sintomas: 'Array de strings com sintomas identificados',
  riscos: 'Array de strings com riscos comerciais',
  oportunidades: 'Array de strings com oportunidades de upsell',
  proximosPassos: 'Array de strings com próximos passos',
  materiaisNecessarios: 'Array de strings com materiais necessários do cliente',
  planoAcao: {
    acoes: '6 ações prioritárias com detalhes',
    cronograma: '3 fases: Urgente, Crescimento, Consolidação',
    metas: 'Metas de 6 meses',
  },
};