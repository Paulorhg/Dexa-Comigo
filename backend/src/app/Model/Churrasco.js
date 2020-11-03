const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ChurrascoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    itensquantity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItensQuantity'
    }],
    date: {
        type: String,
        require: true
    }
});


const Churrasco = mongoose.model('Churrasco', ChurrascoSchema);
// Exportar o modelo
module.exports = Churrasco;
