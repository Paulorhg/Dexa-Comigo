const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ ok: true});
});

module.exports = app => app.use('/churrascos', router);

/*
module.exports = {
    async index(request, response){
        const churrasco = await connection('churrasco').select('*');
    
        return response.json(churrasco);
    },

    async create(request, response) {
        const {date} = request.body;
        const owner = request.headers.owner;

        const [id] = await connection('churrasco').insert({
            date,
            owner
        });

        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const owner = request.headers.authorization;

        const churrasco = await connection('churrasco')
            .where('id', id)
            .select('owner').first();

        if(churrasco.owner != owner){
            return response.status(401).json({ error: 'Operation not permitted.'})
        }

        await connection('churrasco').where('id',id).delete();

        return response.status(204).send();
    },

    async find(request, response){
        const id = request.headers.authorization;

        const churrasco = await connection('churrasco')
            .where('id', id)
            .select('*');

        return response.json(churrasco);
    }
}

*/