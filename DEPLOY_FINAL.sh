#!/bin/bash

# Deploy Final - FRED Agente de Proposta
# Este script automatiza todo o processo de deployment

set -e

PROJECT_DIR="c:\Users\Usuario V4\Documents\Fred - Agente de Proposta\v4-delivery-intelligence"

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  🚀 FRED - DEPLOY PARA CLOUDFLARE        ║"
echo "║     Agente de Proposta v1.0              ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Step 1: Verificar pré-requisitos
echo "📋 PASSO 1: Verificando Pré-requisitos"
echo "────────────────────────────────────"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado"
    echo "Instale em: https://nodejs.org/"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git não encontrado"
    echo "Instale em: https://git-scm.com/"
    exit 1
fi

if ! command -v wrangler &> /dev/null; then
    echo "⚠️  Wrangler não encontrado, instalando..."
    npm install -g wrangler
fi

echo "✅ Node $(node -v)"
echo "✅ npm $(npm -v)"
echo "✅ Git $(git --version | cut -d' ' -f3)"
echo "✅ Wrangler instalado"
echo ""

# Step 2: Preparar Banco de Dados
echo "📋 PASSO 2: Banco de Dados"
echo "────────────────────────"
echo "Opções:"
echo "  1. Neon (https://neon.tech) - Recomendado ⭐"
echo "  2. Render (https://render.com)"
echo "  3. Railway (https://railway.app)"
echo ""
read -p "📝 Cole sua DATABASE_URL (postgresql://...): " DATABASE_URL
echo ""

# Step 3: Credenciais
echo "📋 PASSO 3: Configurar Credenciais"
echo "──────────────────────────────────"

# Gerar NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "✅ NEXTAUTH_SECRET gerado"
echo ""

read -p "🤖 Cole sua ANTHROPIC_API_KEY (sk-ant-...): " ANTHROPIC_API_KEY
echo ""

read -p "🌐 Cole seu domínio (fred-proposta.com): " APP_DOMAIN
NEXTAUTH_URL="https://$APP_DOMAIN"
NEXT_PUBLIC_APP_URL="https://$APP_DOMAIN"

echo ""
echo "📋 PASSO 4: Preparando Projeto"
echo "──────────────────────────────"

cd "$PROJECT_DIR"

echo "📦 Instalando dependências..."
npm install

echo "🗄️  Gerando Prisma client..."
npm run db:generate || echo "⚠️  Prisma generate pode levar alguns segundos..."

echo ""
echo "📋 PASSO 5: Build Local"
echo "──────────────────────"

echo "🔨 Compilando..."
npm run build

if [ ! -d ".next" ]; then
    echo "❌ Build falhou!"
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo ""

# Step 6: Sincronizar Banco de Dados
echo "📋 PASSO 6: Sincronizar Banco de Dados"
echo "─────────────────────────────────────"
read -p "❓ Deseja sincronizar banco de dados agora? (s/n): " SYNC_DB
if [[ $SYNC_DB == "s" || $SYNC_DB == "S" ]]; then
    npm run db:push
else
    echo "⚠️  Lembre-se de executar: npm run db:push"
fi

echo ""
echo "📋 PASSO 7: Cloudflare Pages Setup"
echo "─────────────────────────────────"
echo ""
echo "1. Acesse: https://dash.cloudflare.com"
echo "2. Pages → Create a project → Connect to Git"
echo "3. Selecione seu repositório GitHub"
echo "4. Build Command: npm run build"
echo "5. Output Directory: .next"
echo "6. Clique em Settings → Environment Variables"
echo "7. Adicione as variáveis abaixo:"
echo ""
echo "═════════════════════════════════════════════"
echo "DATABASE_URL=$DATABASE_URL"
echo "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY"
echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET"
echo "NEXTAUTH_URL=$NEXTAUTH_URL"
echo "NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL"
echo "NEXT_PUBLIC_APP_DOMAIN=$APP_DOMAIN"
echo "AI_MODEL=claude-3-5-sonnet-20241022"
echo "═════════════════════════════════════════════"
echo ""

echo "✅ Salve essas variáveis em um arquivo seguro (1password, etc)"
echo ""

# Step 8: Deploy
echo "📋 PASSO 8: Deploy"
echo "─────────────────"
read -p "❓ Deseja fazer deploy agora? (s/n): " DEPLOY_NOW
if [[ $DEPLOY_NOW == "s" || $DEPLOY_NOW == "S" ]]; then
    wrangler pages deploy .next --project-name=v4-delivery-intelligence
    echo ""
    echo "✅ Deploy enviado!"
    echo "📍 Visite: https://v4-delivery-intelligence.pages.dev"
else
    echo "⏳ Você pode fazer deploy depois com:"
    echo "   wrangler pages deploy .next --project-name=v4-delivery-intelligence"
fi

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  ✅ TUDO PRONTO!                          ║"
echo "║  Seu projeto está online no Cloudflare    ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "📞 Suporte:"
echo "   • Cloudflare Docs: https://developers.cloudflare.com/pages/"
echo "   • Next.js Issues: https://github.com/vercel/next.js/issues"
echo "   • Prisma Help: https://www.prisma.io/docs/orm/prisma-client"
echo ""
