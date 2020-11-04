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

app.listen(3333);