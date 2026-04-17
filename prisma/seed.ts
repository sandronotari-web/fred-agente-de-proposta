import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const produtos = [
  {
    productKey: 'trafego-pago',
    productName: 'Tráfego Pago',
    shortDescription: 'Gestão de anúncios pagos no Google e Meta Ads',
    fullDescription: 'Criação, otimização e gestão completa de campanhas de mídia paga. Inclui planejamento de mídia, criação de criativos, configuração de pixels, remarketing e relatórios mensais.',
    idealFor: JSON.stringify(['Empresas que querem escalar captação de leads', 'Negócios com produto validado']),
    mainPainsSolved: JSON.stringify(['Baixa captação de leads', 'Custo por lead alto', 'Falta de previsibilidade em vendas']),
    deliverablesJson: JSON.stringify(['Configuração de conta de anúncios', 'Campanhas de topo, meio e fundo', 'Relatório mensal de performance', 'Pixel e rastreamento configurado']),
    differentialsJson: JSON.stringify(['Time especializado em performance', 'Foco em ROI', 'Relatórios transparentes']),
    priorityRulesJson: JSON.stringify(['Priorize quando o cliente tem produto validado', 'Ideal após landing page otimizada']),
  },
  {
    productKey: 'social-media',
    productName: 'Social Media',
    shortDescription: 'Gestão de redes sociais e produção de conteúdo',
    fullDescription: 'Planejamento editorial, criação de conteúdo, publicação e gestão de redes sociais. Inclui estratégia de posicionamento, identidade de voz e engajamento.',
    idealFor: JSON.stringify(['Empresas que querem autoridade digital', 'Marcas que precisam de consistência']),
    mainPainsSolved: JSON.stringify(['Falta de constância nas redes', 'Posicionamento fraco', 'Baixo engajamento']),
    deliverablesJson: JSON.stringify(['Calendário editorial mensal', 'Posts para feed e stories', 'Estratégia de posicionamento', 'Relatório de engajamento']),
    differentialsJson: JSON.stringify(['Conteúdo estratégico', 'Alinhado com a identidade da marca', 'Foco em posicionamento']),
    priorityRulesJson: JSON.stringify(['Priorize quando há baixa autoridade digital', 'Ideal para construção de marca a longo prazo']),
  },
  {
    productKey: 'web-design',
    productName: 'Site / Landing Page',
    shortDescription: 'Criação e otimização de sites e landing pages',
    fullDescription: 'Desenvolvimento de sites institucionais e landing pages otimizadas para conversão. Design focado em UX, clareza da oferta e velocidade.',
    idealFor: JSON.stringify(['Empresas sem presença digital', 'Negócios com site desatualizado ou sem conversão']),
    mainPainsSolved: JSON.stringify(['Site que não converte', 'Falta de clareza na oferta', 'Presença digital fraca']),
    deliverablesJson: JSON.stringify(['Site responsivo', 'Landing page de captura', 'Integração com pixels', 'SEO técnico básico']),
    differentialsJson: JSON.stringify(['Foco em conversão', 'Design clean e profissional', 'Entrega rápida']),
    priorityRulesJson: JSON.stringify(['Priorize antes de tráfego pago', 'Urgente quando o site é barreira de conversão']),
  },
  {
    productKey: 'branding',
    productName: 'Branding / Identidade Visual',
    shortDescription: 'Criação ou reformulação de identidade visual da marca',
    fullDescription: 'Desenvolvimento de identidade visual completa: logo, paleta de cores, tipografia, manual de marca e aplicações. Posicionamento estratégico da marca.',
    idealFor: JSON.stringify(['Empresas que querem reposicionar a marca', 'Negócios sem identidade consistente']),
    mainPainsSolved: JSON.stringify(['Marca desalinhada com o público', 'Falta de percepção de valor', 'Materiais inconsistentes']),
    deliverablesJson: JSON.stringify(['Logo e variações', 'Manual de marca', 'Templates de redes sociais', 'Aplicações básicas']),
    differentialsJson: JSON.stringify(['Processo estratégico', 'Pesquisa de posicionamento', 'Foco em percepção de valor']),
    priorityRulesJson: JSON.stringify(['Priorize quando a marca está confusa', 'Impacta todos os outros serviços']),
  },
  {
    productKey: 'crm-automacao',
    productName: 'CRM e Automação',
    shortDescription: 'Implementação de CRM e automações comerciais',
    fullDescription: 'Configuração e implementação de CRM, automações de marketing e vendas, fluxos de nutrição e integração entre ferramentas.',
    idealFor: JSON.stringify(['Empresas com processo comercial desorganizado', 'Times de vendas sem visibilidade']),
    mainPainsSolved: JSON.stringify(['Sem processo comercial', 'Leads perdendo no funil', 'Falta de visibilidade do pipeline']),
    deliverablesJson: JSON.stringify(['CRM configurado', 'Funil de vendas estruturado', 'Automações básicas', 'Treinamento do time']),
    differentialsJson: JSON.stringify(['Implantação rápida', 'Treinamento incluído', 'Foco em adoção']),
    priorityRulesJson: JSON.stringify(['Priorize quando há volume de leads sem conversão', 'Necessário para escalar comercial']),
  },
];

async function main() {
  console.log('Semeando banco de dados...');

  for (const produto of produtos) {
    await prisma.produto.upsert({
      where: { productKey: produto.productKey },
      update: {},
      create: produto,
    });
  }

  console.log(`${produtos.length} produtos criados/atualizados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
