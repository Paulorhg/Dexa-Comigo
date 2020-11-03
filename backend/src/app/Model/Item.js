const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    itensquantity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItensQuantity',
        require: true
    }],
});


const Item = mongoose.model('Item', ItemSchema);
// Exportar o modelo
module.exports = Item;
