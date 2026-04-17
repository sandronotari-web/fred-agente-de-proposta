#!/bin/bash

# Configuração rápida de variáveis de ambiente para Cloudflare
# Uso: ./setup-env.sh

set -e

echo "⚙️  Configuração de Variáveis de Ambiente - FRED"
echo ""

# Gerar NEXTAUTH_SECRET
echo "🔐 Gerando NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "NEXTAUTH_SECRET gerado: $NEXTAUTH_SECRET"
echo ""

# Solicitar DATABASE_URL
echo "🗄️  DATABASE_URL"
echo "Opções:"
echo "  1. Neon (https://neon.tech)"
echo "  2. Render (https://render.com)"
echo "  3. Railway (https://railway.app)"
echo ""
read -p "Cole sua DATABASE_URL (postgresql://...): " DATABASE_URL
echo ""

# Solicitar ANTHROPIC_API_KEY
read -p "🤖 Cole sua ANTHROPIC_API_KEY (sk-ant-...): " ANTHROPIC_API_KEY
echo ""

# Solicitar domínio
read -p "🌐 Seu domínio (ex: fred-proposta.com): " APP_DOMAIN
NEXTAUTH_URL="https://$APP_DOMAIN"
NEXT_PUBLIC_APP_URL="https://$APP_DOMAIN"

# Criar arquivo .env.local para teste
cat > .env.local << EOF
# Variáveis de Ambiente - Produção

# Database
DATABASE_URL=$DATABASE_URL

# Next.js
NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_APP_DOMAIN=$APP_DOMAIN

# Auth
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=$NEXTAUTH_URL

# AI
ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY
AI_MODEL=claude-3-5-sonnet-20241022
EOF

echo "✅ Variáveis salvas em .env.local"
echo ""
echo "📋 Use essas variáveis em:"
echo "  • Cloudflare Dashboard > Workers & Pages > Settings > Environment Variables"
echo "  • Vercel Project Settings > Environment Variables"
echo "  • Railway Project Settings > Variables"
echo ""
echo "⚠️  NÃO FAÇA COMMIT DE .env.local - Está no .gitignore"
