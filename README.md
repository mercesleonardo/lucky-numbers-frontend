# Lucky Numbers Frontend

Este é o frontend para o projeto **Lucky Numbers**, uma aplicação web para visualização de resultados de loterias, geração de jogos e conferência de resultados. A interface é construída com Vue.js 3, Vite e TailwindCSS.

## ✨ Funcionalidades

-   **Resultados Recentes:** Visualização dos últimos resultados dos jogos de loteria suportados (Mega-Sena, Quina, Lotofácil).
-   **Detalhes do Concurso:** Exibição de números sorteados e tabela detalhada de prêmios para cada concurso.
-   **Gerador de Jogos:** Ferramenta para gerar jogos aleatórios, com limite de uso diário por sessão.
-   **Conferidor de Jogos:** Funcionalidade para que o usuário insira um jogo e verifique se já foi premiado em concursos anteriores.
-   **Estrutura Dinâmica:** O menu de navegação e as informações dos jogos são carregados dinamicamente a partir da API, permitindo fácil adição de novos jogos no futuro.

## 🛠️ Tecnologias Utilizadas

-   **Vue.js 3:** Framework progressivo para construção de interfaces.
-   **Vite:** Ferramenta de build moderna e ultrarrápida.
-   **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
-   **TailwindCSS:** Framework CSS utility-first para estilização rápida.
-   **Vue Router:** Roteamento para a aplicação.
-   **Axios:** Cliente HTTP para comunicação com a API.
-   **Vitest:** Framework de testes unitários.

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão `^20.19.0 || >=22.12.0` conforme `package.json`)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/lucky-numbers-frontend.git
cd lucky-numbers-frontend
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Ambiente

A aplicação precisa se conectar a uma API backend. A URL da API pode ser configurada através de variáveis de ambiente.

Crie um arquivo chamado `.env.local` na raiz do projeto (você pode copiar o `.env.example`) e adicione a seguinte variável:

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

### 4. Execute o Projeto

Para iniciar o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

## 📜 Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Compila e minifica o projeto para produção.
-   `npm run preview`: Pré-visualiza a build de produção localmente.
-   `npm run test:unit`: Executa os testes unitários com Vitest.
-   `npm run lint`: Executa o linter (ESLint) para encontrar e corrigir problemas no código.
-   `npm run format`: Formata o código com Prettier.
