const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ItensQuantitySchema = new mongoose.Schema({
    churrasco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Churrasco',
        require: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});

const ItensQuantity = mongoose.model('ItensQuantity', ItensQuantitySchema);
// Exportar o modelo
module.exports = ItensQuantity;
