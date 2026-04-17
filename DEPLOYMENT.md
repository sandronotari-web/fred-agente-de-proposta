# Guia de Deployment - FRED Agente de Proposta

## Opções de Deployment

### 1. **Cloudflare Pages** (Recomendado)

#### Pré-requisitos:
- Conta Cloudflare
- Domínio configurado no Cloudflare
- Repositório Git (GitHub/GitLab)

#### Passos:

1. **Conectar Repositório:**
   - Acesse Cloudflare Dashboard → Pages
   - Clique "Create a project" → "Connect to Git"
   - Selecione seu repositório

2. **Configurar Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/` (ou `/v4-delivery-intelligence` se for monorepo)

3. **Adicionar Environment Variables:**
   - `DATABASE_URL` - URL do PostgreSQL (Neon, Render, etc)
   - `ANTHROPIC_API_KEY` - Sua chave Anthropic
   - `NEXTAUTH_SECRET` - Gere com: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - https://seu-dominio.com
   - `NEXT_PUBLIC_APP_URL` - https://seu-dominio.com
   - `NEXT_PUBLIC_APP_DOMAIN` - seu-dominio.com
   - `AI_MODEL` - claude-3-5-sonnet-20241022

4. **Deploy:**
   - Cloudflare fará deploy automaticamente a cada push para main

---

### 2. **Vercel** (Alternativa)

1. **Conectar Repositório:**
   - Acesse https://vercel.com/new
   - Importe seu repositório GitHub

2. **Configurar:**
   - Framework Preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

3. **Adicionar Secrets:**
   - As mesmas variáveis do Cloudflare

4. **Deploy:**
   - Clique "Deploy"

---

### 3. **Self-Hosted com Railway/Render**

#### Com Railway:

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Fazer login
railway login

# Inicializar projeto
railway init

# Adicionar variáveis
railway variables set DATABASE_URL="postgresql://..."
railway variables set ANTHROPIC_API_KEY="sk-ant-..."
railway variables set NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Deploy
railway up
```

---

## Configuração de Banco de Dados

### PostgreSQL Recomendado:

#### Opções:
- **Neon** (https://neon.tech) - Free tier: 0.5 GB
- **Render** (https://render.com) - PostgreSQL free tier
- **Railway** - $5/mês

**Exemplo Neon:**
1. Crie conta em neon.tech
2. Crie novo projeto
3. Copie connection string
4. Use como `DATABASE_URL`

```bash
# Depois de configurar DATABASE_URL, execute:
npm run db:push
```

---

## Checklist de Deploy

- [ ] Domínio registrado e configurado no Cloudflare/Vercel
- [ ] Banco de dados PostgreSQL criado e testado
- [ ] Chave Anthropic válida
- [ ] `NEXTAUTH_SECRET` gerado
- [ ] Variáveis de ambiente configuradas no provider
- [ ] Build local testado: `npm run build`
- [ ] Migrações do Prisma executadas: `npm run db:push`
- [ ] Testes de API funcionando
- [ ] DNS propagado (aguardar até 24h)

---

## Commands

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Start produção
npm start

# Banco de dados
npm run db:push          # Sincronizar schema
npm run db:generate      # Gerar Prisma client
npm run db:studio        # Interface visual

# Lint
npm run lint
```

---

## Troubleshooting

**Erro: "DATABASE_URL not found"**
- Verifique se a variável está definida no provider de deploy

**Erro: "ANTHROPIC_API_KEY invalid"**
- Confirme a chave em https://console.anthropic.com

**Build falha com Prisma**
```bash
npm run db:generate
npm run build
```

**Erro de NextAuth**
- Verifique se NEXTAUTH_SECRET está definido
- NEXTAUTH_URL deve ser HTTPS em produção
- Atualize sua URL em https://next-auth.js.org/getting-started/example

---

## Monitoramento

Depois de deployed, monitore:
- Cloudflare Analytics Engine
- Vercel/Railway dashboards
- Logs de erro
- Performance

---

## Próximos Passos

1. Configure seu domínio
2. Escolha seu host (recomendado: Cloudflare Pages)
3. Configure banco de dados
4. Adicione variáveis de ambiente
5. Faça o deploy
6. Teste fluxos críticos
