#!/bin/bash

# Script de Deploy para Cloudflare Pages
# Uso: ./deploy-cloudflare.sh

set -e

echo "🚀 Iniciando deploy FRED - Agente de Proposta"
echo ""

# Verificar se wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler não está instalado"
    echo "Instalando: npm install -g wrangler"
    npm install -g wrangler
fi

# Verificar se está autenticado
echo "🔐 Verificando autenticação Cloudflare..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Não autenticado. Faça login:"
    wrangler login
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma client
echo "🗄️  Gerando Prisma client..."
npm run db:generate

# Build
echo "🔨 Compilando aplicação..."
npm run build

# Deploy
echo "🌍 Fazendo deploy para Cloudflare Pages..."
wrangler pages deploy .next --project-name=v4-delivery-intelligence

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📋 Próximas ações:"
echo "1. Configure variáveis de ambiente no Cloudflare:"
echo "   - DATABASE_URL"
echo "   - ANTHROPIC_API_KEY"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL"
echo ""
echo "2. Execute: npm run db:push (se ainda não tiver feito)"
echo ""
echo "3. Visite seu site em: https://v4-delivery-intelligence.pages.dev"
