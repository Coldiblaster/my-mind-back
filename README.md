# My Mind

**Plataforma para profissionais cadastrarem suas empresas, definirem horários, tipos de serviços, valores, e gerenciarem suas operações de forma centralizada.**

O projeto foi desenvolvido utilizando **Nest.js** com **Node.js**, integrando o **Prisma ORM** com **PostgreSQL** para gerenciamento do banco de dados, e todo o código está escrito em **TypeScript**.

---

## 📚 Índice

- [My Mind](#my-mind)
  - [📚 Índice](#-índice)
  - [:pushpin: Introdução](#pushpin-introdução)
  - [:warning: Pré-requisitos](#warning-pré-requisitos)
  - [:arrow\_forward: Como rodar](#arrow_forward-como-rodar)
  - [:rocket: Build e Ambientes](#rocket-build-e-ambientes)
    - [Pipeline de Build](#pipeline-de-build)
  - [:open\_file\_folder: Linguagens e dependências](#open_file_folder-linguagens-e-dependências)
    - [Banco de Dados com Docker](#banco-de-dados-com-docker)
  - [:clipboard: Prisma: Migrações e Studio](#clipboard-prisma-migrações-e-studio)
    - [Rodar as Migrações](#rodar-as-migrações)
  - [:construction: Em Desenvolvimento](#construction-em-desenvolvimento)
    - [Futuras funcionalidades incluirão:](#futuras-funcionalidades-incluirão)

---

## :pushpin: Introdução

O **My Mind** é uma plataforma onde qualquer profissional pode cadastrar sua empresa, definir horários de atendimento, criar serviços e valores, e gerenciar suas operações de forma eficiente. O projeto é voltado para o gerenciamento completo do negócio, desde a criação até a manutenção contínua das informações cadastradas.

---

## :warning: Pré-requisitos

- [x] [Git](https://git-scm.com)
- [x] [Node.js](https://nodejs.org/)
- [x] [pnpm](https://pnpm.io/installation) - Gerenciador de pacotes utilizado no projeto
- [x] [Docker](https://www.docker.com/)
- [x] [Docker Compose](https://docs.docker.com/compose/) - Para subir o ambiente de banco de dados PostgreSQL em desenvolvimento

## :arrow_forward: Como rodar

Siga os passos abaixo para rodar o projeto localmente:

```bash
# Clone o repositório (exemplo de URL)
$ git clone git@exemplo.com:seu-repositorio/my-mind.git

# Entre no diretório do projeto
$ cd my-mind

# Instale as dependências
$ pnpm install

# Verifique se o arquivo .env está configurado corretamente, com as seguintes variáveis:
# - DATABASE_URL: URL de conexão com o banco de dados PostgreSQL
# - NEXT_PUBLIC_LINK_SIMULATION: Link do motor de cálculo (caso aplicável)

# Suba o banco de dados utilizando Docker Compose:
$ docker-compose up -d

# Execute as migrações do banco de dados
$ pnpm prisma migrate dev

# Opcionalmente, inicie o Prisma Studio para visualizar e gerenciar os dados diretamente:
$ pnpm prisma studio

# Inicie a aplicação em ambiente de desenvolvimento
$ pnpm run dev

# Para acessar a aplicação, abra seu navegador e vá para:
$ http://localhost:3000/

```

## :rocket: Build e Ambientes

O processo de build e deploy da aplicação é automatizado utilizando pipelines configuradas para os seguintes ambientes:

- **Desenvolvimento (Development)**: O código é testado e integrado continuamente. A cada commit ou pull request, os pipelines são acionados para verificar se o projeto está em conformidade e sem erros. A versão de desenvolvimento é geralmente acessível internamente para validação dos times.

- **Homologação (Staging)**: Após a aprovação em desenvolvimento, o código é movido para o ambiente de homologação, onde os testes finais são realizados. Aqui, as funcionalidades são testadas como se estivessem em produção, permitindo ajustes finais antes do deploy.

- **Produção (Production)**: O código é lançado no ambiente de produção, onde a aplicação está disponível para os usuários finais. Este ambiente é configurado com monitoramento e alertas para garantir a estabilidade.

### Pipeline de Build

Cada etapa do pipeline inclui:

- **Linting**: Verificação do código para garantir que segue os padrões de estilo e boas práticas.
- **Testes automatizados**: Testes de unidade e de integração são executados para garantir que o código esteja funcionando como esperado.
- **Deploy**: O código é automaticamente empacotado e implantado nos servidores do ambiente correto, de acordo com as regras definidas para cada estágio (desenvolvimento, homologação, produção).

---

## :open_file_folder: Linguagens e dependências

Este projeto utiliza as seguintes tecnologias e bibliotecas principais:

- **Nest.js**: Framework utilizado para construção do back-end com Node.js.
- **Node.js**: Plataforma de execução JavaScript utilizada no servidor.
- **Prisma ORM**: Ferramenta de mapeamento objeto-relacional para trabalhar com o banco de dados PostgreSQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado no projeto.
- **TypeScript**: Linguagem utilizada para adicionar tipagem estática ao JavaScript, garantindo maior segurança e robustez ao código.

---

### Banco de Dados com Docker

Para rodar o banco de dados localmente, é necessário ter o **Docker** instalado e executar o comando abaixo para inicializar o ambiente de desenvolvimento:

```bash
# Suba os containers com o Docker Compose
$ docker-compose up -d
```
---

## :clipboard: Prisma: Migrações e Studio

O Prisma ORM é utilizado para gerenciar o banco de dados e realizar as migrações. Aqui estão os passos necessários para configurar e rodar as migrações:

### Rodar as Migrações

Para criar e aplicar as migrações no banco de dados, execute o comando:

```bash
# Cria e aplica as migrações para o banco de dados configurado em .env
$ pnpm prisma migrate dev

# Inicie o Prisma Studio
$ pnpm prisma studio

# Obs: Isso abrirá uma interface web que permite navegar e editar os registros do banco de dados de forma simples e rápida.

```

---

## :construction: Em Desenvolvimento

Estamos trabalhando para melhorar a documentação e adicionar novos recursos, fique atento às atualizações.

### Futuras funcionalidades incluirão:

- Melhorias na performance e otimização de queries.
- Integração com serviços de terceiros.
- Automatização completa de processos de backup e restauração de dados.
- Implementação de um sistema de notificações para os usuários.

