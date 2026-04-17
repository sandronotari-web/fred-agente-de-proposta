# 🆘 TROUBLESHOOTING - SOLUÇÕES RÁPIDAS

## Se o Build Falhar

### ❌ "npm: command not found"
```bash
# Solução: Instale Node.js
https://nodejs.org/
# Depois reinicie seu terminal
```

### ❌ "DATABASE_URL not found"
```
Solução:
1. Cloudflare Dashboard
2. Pages → seu-projeto → Settings
3. Environment Variables
4. Verifique se DATABASE_URL está lá
5. Redeploy
```

### ❌ "Cannot find module 'prisma'"
```bash
# Solução:
npm install
npm run db:generate
npm run build
```

### ❌ "Build timeout (>20 min)"
```
Solução:
1. Verifique se tem node_modules no git (❌ não deve)
2. Verifique .gitignore
3. Commit e push
4. Redeploy
```

---

## Se o Site Não Carregar

### ❌ 502 Bad Gateway
```
Solução:
1. Verifique DATABASE_URL está correto
2. Teste em: psql postgresql://...
3. Execute: npm run db:push
4. Redeploy
```

### ❌ "Error connecting to database"
```
Verifique:
1. DATABASE_URL está no Cloudflare? ✅
2. URL do Neon está correta?
3. Firewall do Neon permite conexão?
   → Neon Console → SQL Editor → verifique acesso
```

### ❌ 404 Not Found
```
Provável: Arquivo não existe em .next
Solução:
1. Build local: npm run build
2. Verifique output em .next/
3. Push e redeploy
```

### ❌ CORS Error
```
Solução (no next.config.js):
module.exports = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}
```

---

## Se o Login Não Funcionar

### ❌ "Invalid NEXTAUTH_SECRET"
```
Solução:
1. Gerar novo secret:
   openssl rand -base64 32
2. Cloudflare → Environment Variables
3. Atualizar NEXTAUTH_SECRET
4. Redeploy
```

### ❌ "Invalid callback URL"
```
Solução:
1. Verifique NEXTAUTH_URL
2. Deve ser: https://seu-dominio.com
3. Sem path nem trailing slash
4. Deve ter HTTPS em produção
5. Redeploy
```

### ❌ Session não persiste
```
Solução:
1. Verifique cookies permitidos
2. Verifiqu https (obrigatório)
3. Checked: __Secure- prefix
```

---

## Se a IA Não Funcionar

### ❌ "Invalid ANTHROPIC_API_KEY"
```
Solução:
1. Verifique chave em:
   https://console.anthropic.com/account/keys
2. Copie exatamente (sem espaços)
3. Cloudflare → Environment Variables
4. Atualizar ANTHROPIC_API_KEY
5. Redeploy
```

### ❌ "API Rate Limited"
```
Solução:
1. Verifique quota em console.anthropic.com
2. Upgrade plano se necessário
3. Implementar retry logic
```

### ❌ Timeout na API Anthropic
```
Solução (no next.config.js):
module.exports = {
  experimental: {
    serverActions: {
      timeoutSeconds: 60,
    }
  }
}
```

---

## Se Aparecer Erro No Console (F12)

### ❌ "Failed to load config"
```
Solução:
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh (Ctrl+Shift+R)
3. Incognito mode test
```

### ❌ "CORS blocked"
```
Solução no API route:
export async function POST(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json',
  };
  
  return Response.json({...}, { headers });
}
```

### ❌ "Undefined is not a function"
```
Solução:
1. Limpar cache local: rm -rf .next
2. Rebuild: npm run build
3. Testar localmente: npm run dev
```

---

## Debug em Produção

### Ver Logs Cloudflare
```
1. Cloudflare Dashboard
2. Pages → seu-projeto
3. Deployments → seu-deploy
4. View logs
```

### Ver Logs do Banco
```
1. Neon Console
2. SQL Editor
3. Verifique queries
```

### Ver Logs da IA
```
1. Anthropic Console → Usage
2. Verifique chamadas
3. Monitore erros
```

---

## Checklist de Debug

```
Se algo não funciona, verifique:

🔍 Ambiente:
   ☐ NODE_ENV = production
   ☐ Variáveis carregadas?
   ☐ Secrets não estão em logs?

🔍 Database:
   ☐ DATABASE_URL correto?
   ☐ Firewall permite conexão?
   ☐ Schema sincronizado?

🔍 API:
   ☐ Endpoints retornam dados?
   ☐ CORS configurado?
   ☐ Timeout suficiente?

🔍 Auth:
   ☐ NEXTAUTH_SECRET definido?
   ☐ NEXTAUTH_URL correto?
   ☐ Cookies habilitados?

🔍 IA:
   ☐ API key válida?
   ☐ Model name correto?
   ☐ Rate limits OK?

🔍 Frontend:
   ☐ Build completo?
   ☐ Assets carregam?
   ☐ CSS/JS sem erros?
```

---

## Teste Rápido Local

Antes de fazer deploy, teste tudo:

```bash
# 1. Instalar
npm install

# 2. Build
npm run build

# 3. Rodar produção local
npm run start

# 4. Testar em http://localhost:3000
# Abrir F12 → Console → verifique erros

# 5. Testar fluxos:
# - Homepage carrega?
# - Login funciona?
# - APIs respondem?
# - IA gera conteúdo?
```

Se tudo OK localmente → Deploy com confiança! ✅

---

## Emergência: Rollback Rápido

Se deploy quebrou:

```
1. Cloudflare → Pages → seu-projeto
2. Deployments → deployment anterior
3. Click em "..." → Rollback
4. Automático em 30 segundos
```

---

## Suporte

- **Cloudflare Status**: https://www.cloudflarestatus.com/
- **Neon Status**: https://status.neon.tech/
- **Anthropic Status**: https://status.anthropic.com/

---

**Problema resolvido? Parabéns! 🎉**
