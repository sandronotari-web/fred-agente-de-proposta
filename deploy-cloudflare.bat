@echo off
REM Script de Deploy para Cloudflare Pages (Windows)
REM Uso: deploy-cloudflare.bat

echo.
echo 🚀 Iniciando deploy FRED - Agente de Proposta
echo.

REM Verificar se wrangler está instalado
where wrangler >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Wrangler não está instalado
    echo Instalando: npm install -g wrangler
    call npm install -g wrangler
)

REM Verificar autenticação
echo 🔐 Verificando autenticação Cloudflare...
call wrangler whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Não autenticado. Faça login:
    call wrangler login
)

REM Instalar dependências
echo 📦 Instalando dependências...
call npm install

REM Gerar Prisma client
echo 🗄️  Gerando Prisma client...
call npm run db:generate

REM Build
echo 🔨 Compilando aplicação...
call npm run build

REM Deploy
echo 🌍 Fazendo deploy para Cloudflare Pages...
call wrangler pages deploy .next --project-name=v4-delivery-intelligence

echo.
echo ✅ Deploy concluído!
echo.
echo 📋 Próximas ações:
echo 1. Configure variáveis de ambiente no Cloudflare:
echo    - DATABASE_URL
echo    - ANTHROPIC_API_KEY
echo    - NEXTAUTH_SECRET
echo    - NEXTAUTH_URL
echo.
echo 2. Execute: npm run db:push (se ainda não tiver feito)
echo.
echo 3. Visite seu site em: https://v4-delivery-intelligence.pages.dev
echo.
pause
