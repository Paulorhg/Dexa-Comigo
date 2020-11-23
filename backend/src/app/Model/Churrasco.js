const mongoose = require('../../database');

const ChurrascoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    itensquantity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItensQuantity'
    }],
    participantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: String,
        require: true
    }
});


const Churrasco = mongoose.model('Churrasco', ChurrascoSchema);
// Exportar o modelo
module.exports = Churrasco;
