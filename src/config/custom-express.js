const express = require('express');

const bodyParser = require('body-parser');

//importando marko, para criação de templates html
require('marko/node-require').install();
require('marko/express');

const app = express();

//config para pegar os dados no corpo da req antes de chegar ao node
app.use(bodyParser.urlencoded({extended: true}));

//importando rotas e chamada da funcao rotas
const routes = require('../app/routes.js');
routes(app);

module.exports = app;