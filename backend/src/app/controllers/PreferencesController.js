
/*
module.exports = {
    async index(request, response){
        const preferences = await connection('preferences').select('*');
    
        return response.json(preferences);
    },

    async create(request, response) {
        const {amount} = request.body;
        const user_id = request.headers.user;
        const item_id = request.headers.item;

        const [id] = await connection('preferences').insert({
            user_id,
            item_id,
            amount
        });

        return response.json({id});
    }
}

*/