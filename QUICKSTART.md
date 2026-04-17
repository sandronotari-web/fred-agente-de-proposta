# 🚀 QUICK START - Deployment Cloudflare

## ⚡ Guia Rápido (10 minutos)

### Passo 1: Preparar Banco de Dados
Escolha uma opção:
- **[Neon](https://neon.tech)** ✅ Recomendado (free tier: 0.5 GB)
- [Render](https://render.com)
- [Railway](https://railway.app)

Crie um banco PostgreSQL e copie a connection string (será `DATABASE_URL`).

---

### Passo 2: Obter Chaves

1. **ANTHROPIC_API_KEY**
   - Acesse: https://console.anthropic.com/account/keys
   - Crie/copie sua chave API

2. **NEXTAUTH_SECRET** (gere com):
   ```bash
   openssl rand -base64 32
   ```
   Ou acesse: https://generate-secret.vercel.app/32

---

### Passo 3: Preparar Aplicação

1. Abra terminal e navegue até o projeto:
   ```bash
   cd "c:\Users\Usuario V4\Documents\Fred - Agente de Proposta\v4-delivery-intelligence"
   ```

2. Instale dependências:
   ```bash
   npm install
   ```

3. Gere Prisma client:
   ```bash
   npm run db:generate
   ```

4. Sincronize banco de dados:
   ```bash
   npm run db:push
   ```
   *(Use a DATABASE_URL do Neon/Render)*

5. Teste localmente:
   ```bash
   npm run build
   npm run dev
   ```
   Visite: http://localhost:3000

---

### Passo 4: Setup Cloudflare

1. **Crie conta**: https://dash.cloudflare.com
2. **Adicione seu domínio** (ou use um subdomínio grátis)
3. **Conecte seu repositório Git**:
   - Pages → Create a project → Connect to Git
   - Selecione o repositório
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Configure Environment Variables** (Settings → Environment Variables):
   ```
   DATABASE_URL = postgresql://...
   ANTHROPIC_API_KEY = sk-ant-...
   NEXTAUTH_SECRET = (seu secret)
   NEXTAUTH_URL = https://seu-dominio.com
   NEXT_PUBLIC_APP_URL = https://seu-dominio.com
   NEXT_PUBLIC_APP_DOMAIN = seu-dominio.com
   AI_MODEL = claude-3-5-sonnet-20241022
   ```

5. **Deploy**: Clique "Save and Deploy"

---

### Passo 5: Verificar Deploy

- ✅ Acesse: `https://seu-projeto.pages.dev`
- ✅ Verifique logs em Pages → Deployments
- ✅ Teste login e APIs

---

## 🔧 Commands Úteis

```bash
# Build local
npm run build

# Preview local do build
npm run start

# Desenvolvimento
npm run dev

# Banco de dados
npm run db:push       # Sincronizar
npm run db:studio     # Interface visual
npm run db:seed       # Seed com dados

# Lint
npm run lint
```

---

## ⚠️ Troubleshooting

| Erro | Solução |
|------|---------|
| "DATABASE_URL not found" | Adicione em Cloudflare: Settings → Environment Variables |
| "ANTHROPIC_API_KEY invalid" | Verifique chave em console.anthropic.com |
| "Build falha Prisma" | Execute `npm run db:generate` antes de build |
| "NextAuth erro" | Verifique NEXTAUTH_URL (deve ser HTTPS em prod) |

---

## 📞 Suporte

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs/
- **NextAuth Docs**: https://next-auth.js.org

---

## ✅ Checklist Final

- [ ] Banco de dados criado (Neon/Render/Railway)
- [ ] DATABASE_URL copiada
- [ ] ANTHROPIC_API_KEY obtida
- [ ] NEXTAUTH_SECRET gerado
- [ ] Projeto built localmente sem erros
- [ ] Repositório no GitHub/GitLab
- [ ] Cloudflare Pages conectado ao Git
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy acionado
- [ ] Site funcionando em https://seu-dominio.com

---

**Status**: Pronto para deploy! 🎉
