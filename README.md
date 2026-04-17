# V4 Delivery Intelligence

Sistema interno de gestão de projetos e geração de landing pages personalizadas.

## Objetivo

O sistema precisa:
1. Receber dados do cliente
2. Receber transcrição da reunião
3. Receber serviços vendidos
4. Receber observações do closer
5. Consultar uma base de produtos/portfólio
6. Gerar diagnóstico interno
7. Mostrar dashboard do projeto
8. Gerar uma landing pública personalizada para o cliente

## Stack

- **Frontend**: Next.js + React + TypeScript
- **Estilo**: Tailwind CSS
- **Backend**: API routes / Server Actions
- **Validação**: Zod
- **Structure**: Modular e escalável

## Módulos Principais

- autenticação simples
- dashboard geral
- cadastro de projeto
- intake multi-etapas
- base de produtos / portfólio
- análise por skills
- dashboard interno do projeto
- editor de revisão
- preview da LRP
- landing pública por slug

## Getting Started

```bash
npm install
npm run dev
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Landingpage externa |
| `/login` | Login de acesso |
| `/dashboard` | Dashboard geral |
| `/biblioteca` | Base de produtos |
| `/projetos/[id]/dashboard` | Dashboard do projeto |
| `/projetos/[id]/intake` | Intake multi-etapas |
| `/projetos/[id]/editor` | Editor de revisão |
| `/projetos/[id]/preview` | Preview da LRP |
| `/lrp/[slug]` | Landing pública do cliente |