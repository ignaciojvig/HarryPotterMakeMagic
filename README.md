## **Make Magic Challenge**

A API deste repositório foi construida sobre **Node** na versão **12.18.3**, portanto, certifique-se de possuir o mesmo nessa versão ou superior.

Para executar a API, siga os seguintes passos:

 - Faça o clone do repositório `https://github.com/ignaciojvig/HarryPotterMakeMagic`
 - Dentro dele, execute o comando `npm install` para fazer o download de todas as dependências da aplicação
 - Por fim execute o comando `npm run start` para executar a API.

O projeto em questão realizou todos os requisitos propostos e contempla diversas features, dentre elas:

 - Persistência de Dados utilizando SQLite3 - gerenciado pela própria aplicação (Para 'resetar' o banco, basta excluir o arquivo e re-iniciar a API) incluindo mecanismo de Seeding
 - Docker para executar a aplicação dentro de um container (Dentro do package.json já existem dois comandos específicos para agilizar nesse passo. `npm run docker:build` e `npm run docker:run`
 - Cobertura de testes unitáros em 100% por meio do Jest e reports do Istanbul. Contudo, o projeto ainda possui espaços para mais testes unitários e testes de integração.
 - Mecanismo de Caching
 - Swagger que pode ser acessado no endereço `localhost:3000/swagger`


<p  align="center">

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo_text.svg"  width="320"  alt="Nest Logo" /></a>

</p>

  

[travis-image]:  https://api.travis-ci.org/nestjs/nest.svg?branch=master

[travis-url]:  https://travis-ci.org/nestjs/nest

[linux-image]:  https://img.shields.io/travis/nestjs/nest/master.svg?label=linux

[linux-url]:  https://travis-ci.org/nestjs/nest

<p  align="center">A progressive <a  href="http://nodejs.org"  target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a  href="https://angular.io"  target="blank">Angular</a>.</p>

<p  align="center">

<a  href="https://www.npmjs.com/~nestjscore"><img  src="https://img.shields.io/npm/v/@nestjs/core.svg"  alt="NPM Version" /></a>

<a  href="https://www.npmjs.com/~nestjscore"><img  src="https://img.shields.io/npm/l/@nestjs/core.svg"  alt="Package License" /></a>

<a  href="https://www.npmjs.com/~nestjscore"><img  src="https://img.shields.io/npm/dm/@nestjs/core.svg"  alt="NPM Downloads" /></a>

<a  href="https://travis-ci.org/nestjs/nest"><img  src="https://api.travis-ci.org/nestjs/nest.svg?branch=master"  alt="Travis" /></a>

<a  href="https://travis-ci.org/nestjs/nest"><img  src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux"  alt="Linux" /></a>

<a  href="https://coveralls.io/github/nestjs/nest?branch=master"><img  src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5"  alt="Coverage" /></a>

<a  href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img  src="https://badges.gitter.im/nestjs/nestjs.svg"  alt="Gitter" /></a>

<a  href="https://opencollective.com/nest#backer"><img  src="https://opencollective.com/nest/backers/badge.svg"  alt="Backers on Open Collective" /></a>

<a  href="https://opencollective.com/nest#sponsor"><img  src="https://opencollective.com/nest/sponsors/badge.svg"  alt="Sponsors on Open Collective" /></a>

<a  href="https://paypal.me/kamilmysliwiec"><img  src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>

<a  href="https://twitter.com/nestframework"><img  src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

</p>

<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

  

## Description

  

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

  

## Installation

  

```bash

$ npm install

```

  

## Running the app

  

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

  

# production mode

$ npm run start:prod

```

  

## Test

  

```bash

# unit tests

$ npm run test

  

# e2e tests

$ npm run test:e2e

  

# test coverage

$ npm run test:cov

```

  

## Support

  

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

  

## Stay in touch

  

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)

- Website - [https://nestjs.com](https://nestjs.com/)

- Twitter - [@nestframework](https://twitter.com/nestframework)

  

## License

  

Nest is [MIT licensed](LICENSE).