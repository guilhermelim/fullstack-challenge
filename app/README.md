# Fullstack Challenge

## Descrição

O Fullstack Challenge é um projeto que oferece uma solução completa para desenvolvedores interessados em iniciar rapidamente com uma API GraphQL e um front-end integrado.

## Dependências do Projeto

- [NVM - Node Version Manager](https://github.com/nvm-sh/nvm): O NVM é uma ferramenta que gerencia as versões do Node.js em seu ambiente de desenvolvimento. Ele garante que estamos utilizando a versão específica do [Node.js](https://nodejs.org) definida no arquivo `.nvmrc` do projeto.
- [Docker](https://www.docker.com): O Docker é uma plataforma que permite aos desenvolvedores criar, testar e implantar aplicativos rapidamente, garantindo que eles sejam executados da mesma forma em diferentes ambientes.
- [Docker Compose](https://docs.docker.com/compose): O Docker Compose é uma ferramenta para definir e executar aplicativos Docker de vários contêineres. Com o Compose, é possível usar um arquivo YAML para configurar os serviços de sua aplicação.

## Configuração do Ambiente

Antes de iniciar o projeto, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js: Versão especificada no arquivo `.nvmrc`
- npm: Gerenciador de pacotes do Node.js
- Docker: Para iniciar e gerenciar o container do banco de dados MongoDB
- Docker Compose: Para simplificar o gerenciamento dos contêineres da aplicação.

## Iniciando o Projeto

1. Instale a versão especificada do Node.js utilizando o NVM:

   ```
   nvm install
   ```

2. Instale as dependências do projeto utilizando npm:

   ```
   npm install
   ```

4. Inicie o projeto em modo de desenvolvimento:

   ```
   npm run dev
   ```

Para rodar o projeto em produção é obrigatório criar o arquivo `.env.local`. Você pode rodar o comado `cp .env.development .env.local` para obter a configuração padrão das variáveis de ambiente.

## Contribuindo

Sinta-se à vontade para contribuir com novas funcionalidades, correções de bugs ou melhorias para o projeto. Basta seguir estas etapas:

1. Faça um fork do repositório e clone-o em sua máquina local.
2. Crie uma branch para sua contribuição:

   ```
   git checkout -b minha-contribuicao
   ```

3. Faça suas alterações e faça commit delas:

   ```
   git commit -m "Minha contribuição"
   ```

4. Envie suas alterações para o seu fork:

   ```
   git push origin minha-contribuicao
   ```

5. Abra um Pull Request no repositório original.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
