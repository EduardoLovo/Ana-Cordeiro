# Ana Cordeiro — Arquitetura & Urbanismo

Segundo site/portfólio de Ana Cordeiro, no estilo **minimalista preto & branco**
(inspirado no design anterior), com painel de administração próprio onde todo o
conteúdo é editável **sem mexer no código**.

## Tecnologias

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — design system minimalista
- **Sanity** — CMS/painel embutido em `/studio`
- **Motion** — animações do menu mobile (o restante é transições CSS de hover)
- Imagens otimizadas via `next/image` + CDN do Sanity
- Deploy na **Vercel**

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha com os dados do seu projeto Sanity
npm run dev
```

- Site: http://localhost:3000
- Painel: http://localhost:3000/studio

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto Sanity (obrigatório) |
| `NEXT_PUBLIC_SANITY_DATASET` | Conjunto de dados (normalmente `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API do Sanity (data) |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (para SEO) |
| `SANITY_API_WRITE_TOKEN` | Token de escrita (grava as mensagens de contato no painel) — **segredo** |

> Enquanto `NEXT_PUBLIC_SANITY_PROJECT_ID` for `placeholder`, o site roda
> exibindo estados vazios — útil antes de conectar o Sanity.

## Estrutura

```
src/
├── app/
│   ├── (site)/     # Site público (home, projetos, sobre, contato)
│   ├── api/contato # Endpoint do formulário (grava no painel)
│   └── studio/     # Painel Sanity embutido em /studio
├── components/     # Cabeçalho, rodapé, cards, formulário, UI
├── lib/            # Utilidades (formatação, URL do site)
└── sanity/         # Schemas, consultas, cliente e estrutura do painel
```

## Conteúdo editável (painel /studio)

Página inicial, Página Sobre, Projetos (+ categorias), Configurações do site e
Mensagens de contato. Ao clicar em **Publicar**, o site atualiza sozinho.

## Propriedade

Projeto pensado para ser transferido às contas da arquiteta (GitHub, Vercel e
Sanity — todas gratuitas).
