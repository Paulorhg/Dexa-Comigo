/*

module.exports = {
    async index(request, response){
        const friend = await connection('friend').select('*');
    
        return response.json(friend);
    },

    async create(request, response) {
        const {amount} = request.body;
        const user1_id = request.headers.user1;
        const user2_id = request.headers.user2;

        const [id] = await connection('friend').insert({
            user1_id,
            user2_id,
        });

        return response.json({id});
    }
}

*/