const { Router, request } = require('express');
const express = require('express');

const routes = express.Router();

routes.post('/users',  (req, resp) => {
    const body = req.body;

    console.log(body);

    return resp.json({
        evento:'Churras',
        criador: 'Pedrão'
    });
});

module.exports = routes;