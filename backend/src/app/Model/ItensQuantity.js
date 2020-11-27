const mongoose = require('../../database');

const ItensQuantitySchema = new mongoose.Schema({
    churrasco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Churrasco',
        require: true
    },
    item: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        required: true,
    }
});

const ItensQuantity = mongoose.model('ItensQuantity', ItensQuantitySchema);
// Exportar o modelo
module.exports = ItensQuantity;
