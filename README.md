# WorldExplorer

Aplicação web para explorar informações sobre países do mundo todo, desenvolvida como desafio trainee de Frontend da CompJr.

**Demo:** [worldexplorer-puce.vercel.app](https://worldexplorer-puce.vercel.app)

## Funcionalidades

**Autenticação**
- Cadastro com validação de e-mail, senha mínima de 8 caracteres, exigência de letra maiúscula e número, e indicador visual de força da senha
- Login com verificação contra usuários cadastrados e feedback por toast
- Redefinição de senha em duas etapas: verificação do e-mail e definição da nova senha
- Rotas protegidas — apenas usuários autenticados acessam a aplicação

**Exploração de países**
- Listagem de ~250 países consumida da [RestCountries API](https://restcountries.com)
- Busca por nome, filtro por região e ordenação por nome (A→Z, Z→A) ou população
- Página de detalhe com nome oficial, nome nativo, capital, sub-região, população, área, moedas, idiomas, domínio e países vizinhos clicáveis

**Favoritos — CRUD completo via `localStorage`**
- **Create** — adicionar país aos favoritos pelo card ou pela página de detalhe
- **Read** — listagem dos países salvos em "Minha Lista"
- **Update** — editar anotação individual por país com fluxo explícito de editar/salvar/cancelar
- **Delete** — remover país da lista com toast de confirmação

**Experiência**
- Tema dark/light com preferência persistida no `localStorage` (dark por padrão)
- Toasts de feedback em todas as ações relevantes (login, cadastro, favoritar, salvar nota)
- Spinner animado e estado de erro estilizado com botão de retry
- Layout responsivo para mobile, tablet e desktop

## Tecnologias utilizadas

| Tecnologia | Versão | Justificativa |
|---|---|---|
| React | 19 | Biblioteca recomendada pelo desafio; componentização, Context API e hooks customizados tornam a arquitetura escalável |
| Vite | 8 | Build tool moderna com HMR instantâneo, substitui CRA com ganho real de performance no desenvolvimento |
| React Router DOM | 7 | Solução padrão de roteamento para React, com suporte a rotas protegidas e navegação declarativa |
| CSS Modules | — | Escopo de estilos por componente sem dependência extra; evita conflito de classes e mantém o CSS colocado com quem o usa |

A autenticação e o CRUD de favoritos foram implementados via `localStorage`, conforme orientação do desafio para candidatos da trilha front-end.

## Arquitetura de pastas

```
src/
├── assets/       # Imagens e recursos estáticos
├── components/   # Componentes reutilizáveis (Header, CountryCard, Toast, Spinner)
├── context/      # Contextos React para estado global (temas, favoritos, toasts)
├── hooks/        # Custom hooks (useCountries)
├── pages/        # Páginas da aplicação (Login, Register, ForgotPassword, Home, Favorites, CountryDetail)
└── services/     # Funções de acesso a dados (API RestCountries, authService, favoritesService)
```

**Sobre a pasta `styles/`:** o desafio sugere essa pasta como exemplo de estrutura. Optamos por CSS Modules, que colocam cada arquivo `.module.css` ao lado do componente que o usa. Essa abordagem elimina a necessidade de uma pasta `styles/` global, evita conflitos de classe e é amplamente adotada em projetos React modernos. A escolha está justificada na tabela de tecnologias acima.

**Sobre `context/` e `hooks/`:** foram adicionados ao modelo base porque o React possui camadas de estado global e lógica reutilizável que não se encaixam semanticamente em `components/` nem em `services/`. Contextos gerenciam estado em memória compartilhado entre componentes; hooks encapsulam lógica com estado sem renderizar interface. Misturá-los com serviços (que lidam com persistência e APIs externas) comprometeria a clareza da arquitetura.

## Como instalar e executar

**Pré-requisitos:** Node.js 20+

```bash
# Clone o repositório
git clone https://github.com/henriqueecss/worldexplorer.git
cd worldexplorer

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Como usar

1. Crie uma conta em **Criar conta** (e-mail válido, mínimo 8 caracteres, uma maiúscula e um número) e faça login
2. Alterne entre dark e light mode pelo botão no canto superior direito do header
3. Navegue pelos países — busque por nome, filtre por região ou ordene por nome/população
4. Clique em qualquer card para ver os detalhes completos do país
5. Use o **☆** no card ou na página de detalhe para adicionar à sua lista
6. Acesse **Minha Lista** no header para gerenciar favoritos, editar anotações e remover países

## Build para produção

```bash
npm run build
npm run preview
```

## Executar com Docker

**Pré-requisitos:** Docker Desktop instalado e em execução.

```bash
docker compose up --build
```

Acesse `http://localhost:8080` no navegador. A imagem usa Node.js 22 para o build e Nginx Alpine para servir os arquivos estáticos.

## Diferenciais implementados

- **Commits descritivos** — histórico com conventional commits (`feat:`, `fix:`, `docs:`, `chore:`), uma alteração lógica por commit
- **Validações de formulário** — e-mail, senha mínima de 8 caracteres, letra maiúscula, número e confirmação de senha
- **Feedback visual** — toasts animados, spinner de carregamento e estado de erro com botão de retry
- **Tratamento de erros da API** — falhas de conexão exibem mensagem amigável com opção de tentar novamente
- **Deploy** — aplicação disponível em [worldexplorer-puce.vercel.app](https://worldexplorer-puce.vercel.app)
- **Kanban** — projeto organizado com GitHub Projects (A Fazer / Em Andamento / Concluído)
- **Docker** — containerização com multi-stage build (Node 22 + Nginx Alpine)
