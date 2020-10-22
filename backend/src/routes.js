const express = require('express');

const UsersController = require('./controllers/UsersController');
const ItensController = require('./controllers/ItensController');
const ItemQuantidadeController = require('./controllers/ItemQuantidadeController');
const ChurrascoController = require('./controllers/ChurrascoController');
const PreferencesController = require('./controllers/PreferencesController');
const FriendController = require('./controllers/FriendController');
const ParticipanteController = require('./controllers/ParticipanteController');

const routes = express.Router();

routes.get('/users',UsersController.index);

routes.post('/users',UsersController.create);

routes.get('/itens',ItensController.index);

routes.post('/itens',ItensController.create);

routes.get('/itemQuantidade',ItemQuantidadeController.index);

routes.post('/itemQuantidade',ItemQuantidadeController.create);

routes.get('/churrasco',ChurrascoController.index);

routes.get('/churrasco',ChurrascoController.find);

routes.post('/churrasco',ChurrascoController.create);

routes.delete('/churrasco/:id',ChurrascoController.delete);

routes.get('/preferences',PreferencesController.index);

routes.post('/preferences',PreferencesController.create);

routes.get('/friend',FriendController.index);

routes.post('/friend',FriendController.create);

routes.get('/participante',ParticipanteController.index);

routes.post('/participante',ParticipanteController.create);

module.exports = routes;