const express = require('express');

//importando marko, para criação de templates html
require('marko/node-require').install();
require('marko/express');

const app = express();

//importando rotas e chamada da funcao rotas
const routes = require('../app/routes.js');
routes(app);

module.exports = app;