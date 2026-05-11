# 🌍 WorldExplorer

Aplicação web para explorar informações sobre países do mundo todo, desenvolvida como desafio trainee de Frontend da CompJr.

## Funcionalidades

- **Login** com validação de formulário (e-mail, senha mínima de 6 caracteres) e autenticação simulada via `localStorage`
- **Listagem de países** consumida da [RestCountries API](https://restcountries.com), com busca por nome e filtro por região
- **Página de detalhe** de cada país, exibindo nome oficial, nome nativo, capital, região, sub-região, população, área, moedas, idiomas, domínio e países vizinhos clicáveis
- **Lista de favoritos** com suporte a anotações por país (Create, Update, Delete via `localStorage`)
- **Feedback visual** com toast de notificação ao favoritar/desfavoritar países
- Rotas protegidas — apenas usuários autenticados acessam a aplicação
- Layout responsivo para mobile, tablet e desktop

## Tecnologias utilizadas

| Tecnologia | Versão | Justificativa |
|---|---|---|
| React | 19 | Biblioteca recomendada pelo desafio, componentização eficiente e ecossistema maduro |
| Vite | 8 | Ferramenta de build moderna com HMR instantâneo, superior ao CRA em performance de desenvolvimento |
| React Router DOM | 7 | Solução padrão de roteamento para React, com suporte a rotas protegidas e navegação declarativa |
| CSS Modules | — | Escopo de estilos por componente sem dependência extra, evita conflitos de classe e mantém o CSS próximo de quem o usa |

A autenticação e o CRUD de favoritos foram implementados via `localStorage`, conforme orientação do desafio para candidatos da trilha front-end.

## Arquitetura de pastas

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis (Header, CountryCard, Toast)
├── context/         # Contextos React para estado global (favoritos e toasts)
├── pages/           # Páginas da aplicação (Login, Home, Favorites, CountryDetail)
└── services/        # Funções de acesso a dados (API e localStorage)
```

A pasta `context/` foi adicionada ao modelo base pois o React possui uma camada de estado global distinta de serviços e componentes. Misturá-la em `services/` seria semanticamente incorreto, já que serviços lidam com persistência e a API externa, enquanto contextos gerenciam estado em memória compartilhado entre componentes.

## Como instalar e executar

**Pré-requisitos:** Node.js 18+

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/worldexplorer.git
cd worldexplorer

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Como usar

1. Na tela de login, informe qualquer e-mail válido e uma senha com no mínimo 6 caracteres
2. Navegue pela listagem de países — use a busca ou o filtro por região
3. Clique em um card para ver os detalhes completos do país
4. Use o botão **☆ Favoritar** para adicionar à sua lista pessoal
5. Acesse **⭐ Minha Lista** no header para gerenciar seus favoritos e adicionar anotações

## Build para produção

```bash
npm run build
npm run preview
```
