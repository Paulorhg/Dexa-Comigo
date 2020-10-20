const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const itemQuantidade = await connection('itemQuantidade').select('*');
    
        return response.json(itemQuantidade);
    },

    async create(request, response) {
        const {amount} = request.body;
        const guest_id = request.headers.guest;
        const item_id = request.headers.item;

        const [id] = await connection('itemQuantidade').insert({
            guest_id,
            item_id,
            amount
        });

        return response.json({id});
    }
}