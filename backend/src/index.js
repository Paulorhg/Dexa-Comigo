const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const routes = require('./routes');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('./app/controllers/authController')(app);
require('./app/controllers/ChurrascoController')(app);
require('./app/controllers/ItensController')(app);
require('./app/controllers/UsersController')(app);
require('./app/controllers/FriendController')(app);

app.listen(3333);