const express = require('express');

const UsersController = require('./controllers/UsersController');
const ItensController = require('./controllers/ItensController');
const ItemQuantidadeController = require('./controllers/ItemQuantidadeController');

const routes = express.Router();

routes.get('/users',UsersController.index);

routes.post('/users',UsersController.create);

routes.get('/itens',ItensController.index);

routes.post('/itens',ItensController.create);

routes.get('/itemQuantidade',ItemQuantidadeController.index);

routes.post('/itemQuantidade',ItemQuantidadeController.create);

module.exports = routes;