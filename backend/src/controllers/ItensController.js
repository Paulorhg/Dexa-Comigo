const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const itens = await connection('itens').select('*');
    
        return response.json(itens);
    },

    async create(request, response) {
        const { name, value} = request.body;

        const [id] = await connection('itens').insert({
            name,
            value
        });

        return response.json({id});
    }
}