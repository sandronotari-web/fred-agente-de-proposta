# Checklist de Deploy - FRED Agente de Proposta

## 📋 Antes do Deploy

### Banco de Dados
- [ ] Criar banco PostgreSQL (Neon/Render/Railway)
- [ ] Testar conexão com DATABASE_URL
- [ ] Executar: `npm run db:push`
- [ ] Verificar schema com: `npm run db:studio`

### Credenciais
- [ ] Obter ANTHROPIC_API_KEY de console.anthropic.com
- [ ] Gerar NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Testar credenciais localmente

### Build Local
- [ ] Executar: `npm install`
- [ ] Executar: `npm run db:generate`
- [ ] Executar: `npm run build` (sem erros)
- [ ] Executar: `npm run dev` (testar em http://localhost:3000)
- [ ] Testar login e fluxos principais

### Repositório Git
- [ ] Código commitado e pushed
- [ ] `.env*` no `.gitignore`
- [ ] Node_modules no `.gitignore`
- [ ] Build artifacts no `.gitignore`

---

## 🌍 Cloudflare Pages Setup

### Conta & Domínio
- [ ] Conta Cloudflare criada (https://dash.cloudflare.com)
- [ ] Domínio registrado/apontando para Cloudflare
- [ ] DNS resolvendo corretamente

### Conectar Repositório
- [ ] Acessar: Pages → Create a project → Connect to Git
- [ ] Selecionar repositório correto
- [ ] Selecionar branch main/master

### Configurar Build
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Root directory: `/` (ou `/v4-delivery-intelligence` se monorepo)
- [ ] Node version: 18+ (definida em `.npmrc` ou via UI)

### Environment Variables
- [ ] DATABASE_URL
- [ ] ANTHROPIC_API_KEY
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL (https://seu-dominio.com)
- [ ] NEXT_PUBLIC_APP_URL (https://seu-dominio.com)
- [ ] NEXT_PUBLIC_APP_DOMAIN (seu-dominio.com)
- [ ] AI_MODEL = claude-3-5-sonnet-20241022
- [ ] NODE_ENV = production

### Deployment
- [ ] Clicar "Save and Deploy"
- [ ] Monitorar build logs
- [ ] Verificar deploy bem-sucedido

---

## ✅ Pós-Deploy

### Testes
- [ ] Acessar https://seu-dominio.com
- [ ] Página carrega sem erros (F12 → Console)
- [ ] Fluxo de login funciona
- [ ] API endpoints respondem
- [ ] Banco de dados conecta corretamente

### Monitoramento
- [ ] Setup alertas no Cloudflare
- [ ] Monitorar performance
- [ ] Verificar logs de erro
- [ ] Testar em diferentes browsers

### Segurança
- [ ] HTTPS funcionando
- [ ] Headers de segurança configurados
- [ ] Rate limiting ativo
- [ ] CORS configurado corretamente
- [ ] Sem dados sensíveis em logs públicos

---

## 🔄 CI/CD

### GitHub Actions (Opcional)
- [ ] Criar `.github/workflows/deploy.yml`
- [ ] Testes automáticos no PR
- [ ] Lint/format automático
- [ ] Deploy automático em merge

### Rollback Plan
- [ ] Conhecer como reverter version no Cloudflare
- [ ] Ter backup do banco de dados
- [ ] Documentar versão atual

---

## 📊 Performance

- [ ] Lighthouse score ≥ 80
- [ ] Time to First Byte (TTFB) < 1s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cache headers configurados
- [ ] Compressão gzip ativa

---

## 🚨 Troubleshooting Rápido

Se algo der errado:

1. **Verificar logs**:
   - Cloudflare Pages → Deployments → seu-deploy → View build log

2. **Rebuild local**:
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **Verificar DB**:
   ```bash
   npm run db:studio
   ```

4. **Testar localmente** antes de fazer changes:
   ```bash
   npm run dev
   ```

5. **Commit & push** para triggar novo deploy

---

**Data do Deploy**: _______________
**URL**: _______________
**Status**: ⚪ Em Progresso | ✅ Concluído | ❌ Erro
**Notas**: _______________
