-- Migration: 0001_initial
-- Created for Cloudflare D1

CREATE TABLE IF NOT EXISTS "clientes" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nome" TEXT NOT NULL,
  "empresa" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "telefone" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "produtos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "productKey" TEXT NOT NULL UNIQUE,
  "productName" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "fullDescription" TEXT NOT NULL,
  "idealFor" TEXT NOT NULL DEFAULT '[]',
  "mainPainsSolved" TEXT NOT NULL DEFAULT '[]',
  "deliverablesJson" TEXT NOT NULL DEFAULT '[]',
  "differentialsJson" TEXT NOT NULL DEFAULT '[]',
  "priorityRulesJson" TEXT NOT NULL DEFAULT '[]',
  "isActive" INTEGER NOT NULL DEFAULT 1,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "projetos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "clienteId" TEXT NOT NULL,
  "nomeProjeto" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "transcricao" TEXT,
  "observacoes" TEXT,
  "diagnosticoJson" TEXT,
  "lrpConteudoJson" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "projetos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "projetos_clienteId_idx" ON "projetos"("clienteId");
CREATE INDEX IF NOT EXISTS "projetos_status_idx" ON "projetos"("status");

CREATE TABLE IF NOT EXISTS "servicos_vendidos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "projetoId" TEXT NOT NULL,
  "produtoId" TEXT,
  "nome" TEXT NOT NULL,
  "escopo" TEXT NOT NULL,
  CONSTRAINT "servicos_vendidos_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "servicos_vendidos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "servicos_vendidos_projetoId_idx" ON "servicos_vendidos"("projetoId");

-- Seed default products
INSERT OR IGNORE INTO "produtos" ("id","productKey","productName","shortDescription","fullDescription","idealFor","mainPainsSolved","deliverablesJson","differentialsJson","priorityRulesJson","isActive","createdAt","updatedAt")
VALUES
('prod_trafego','trafego-pago','Tráfego Pago','Gestão de anúncios pagos para geração de leads','Gestão completa de campanhas de mídia paga incluindo Google Ads, Meta Ads e outras plataformas para maximizar ROI e geração de leads qualificados.','["negócios que precisam de leads imediatos","e-commerce","prestadores de serviço"]','["falta de clientes","baixo volume de leads","dependência de indicações"]','["setup de campanhas","relatórios mensais","otimização contínua","landing pages"]','["estratégia baseada em dados","foco em ROI","acompanhamento semanal"]','["mencionou falta de clientes","quer escalar vendas","tem produto validado"]',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('prod_social','social-media','Social Media','Gestão profissional de redes sociais','Criação de conteúdo estratégico, gerenciamento de redes sociais e construção de audiência engajada para fortalecer a presença digital da marca.','["negócios que querem construir audiência","marcas que precisam de autoridade","empresas B2C"]','["ausência nas redes","conteúdo inconsistente","baixo engajamento"]','["calendário editorial","criação de posts","stories","relatório mensal"]','["conteúdo alinhado à estratégia","voz de marca consistente","análise de métricas"]','["mencionou redes sociais","quer mais seguidores","precisa de conteúdo"]',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('prod_web','web-design','Web Design','Criação e otimização de sites e landing pages','Desenvolvimento de sites profissionais, landing pages de alta conversão e otimização de experiência do usuário para maximizar resultados digitais.','["negócios sem site","sites desatualizados","quem quer melhorar conversão"]','["site desatualizado","baixa conversão","má experiência do usuário"]','["site institucional","landing pages","otimização de conversão","SEO básico"]','["design focado em conversão","mobile-first","velocidade de carregamento"]','["mencionou site ruim","quer melhorar presença online","não tem site"]',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('prod_branding','branding','Branding','Construção e fortalecimento de identidade de marca','Desenvolvimento de identidade visual, posicionamento de marca e estratégia de branding para criar uma marca memorável e diferenciada no mercado.','["negócios novos","rebranding","marcas sem identidade clara"]','["identidade visual fraca","falta de diferenciação","marca confusa"]','["manual de identidade","logotipo","paleta de cores","tipografia","tom de voz"]','["estratégia de posicionamento","pesquisa de mercado","design profissional"]','["mencionou logo feio","quer profissionalizar marca","nova empresa"]',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('prod_crm','crm-automacao','CRM & Automação','Implementação de CRM e automações de marketing','Configuração e implementação de sistemas de CRM, automações de marketing e fluxos de nutrição para otimizar o processo de vendas e relacionamento com clientes.','["negócios com volume de leads","times de vendas","e-commerce"]','["leads perdidos","processo de vendas desorganizado","falta de follow-up"]','["setup de CRM","automações de e-mail","fluxos de nutrição","treinamento do time"]','["integração com ferramentas existentes","processos customizados","suporte dedicado"]','["mencionou perder leads","processo de vendas bagunçado","quer automatizar"]',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
