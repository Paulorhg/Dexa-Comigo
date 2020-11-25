const mongoose = require('../../database');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    }
});


const Item = mongoose.model('Item', ItemSchema);
// Exportar o modelo
module.exports = Item;
