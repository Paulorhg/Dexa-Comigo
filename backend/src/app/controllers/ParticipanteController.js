
/*
module.exports = {
    async index(request, response){
        const participante = await connection('participante').select('*');
    
        return response.json(participante);
    },

    async create(request, response) {
        const {confirm} = request.body;
        const user_id = request.headers.user;
        const churras_id = request.headers.churras;

        const [id] = await connection('participante').insert({
            user_id,
            churras_id,
            confirm
        });

        return response.json({id});
    }
}
*/