const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Item = require('../Model/Item');
const ItensQuantity = require('../Model/ItensQuantity');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const itens = await Item.find().populate(['user', 'itensquantity']);

        return res.send({ itens });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading itens' })
    }
});

router.get('/:itemId', async (req, res) => {
    try {
        const item = await item.findById(req.params.itemId).populate(['user', 'itensquantity']);

        return res.send({ item });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading item' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { name, date, itensquantity } = req.body;

        const item = await Item.create({ name, date, user: req.userId });

        await Promise.all(itensquantity.map(async itemquantity => {
            const itemItens = new ItensQuantity({ ...itemquantity, item: item._id });

            await itemItens.save();

            item.itensquantity.push(itemItens);
        }));

        await item.save();

        return res.send({ item });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new item' })
    }
});

router.put('/:churrascoId', async (req, res) => {
    try {

        const { name, date, itensquantity } = req.body;

        const churrasco = await Churrasco.findByIdAndUpdate(req.params.churrascoId, { name, date }, { new: true });

        churrasco.itensquantity = [];
        await ItensQuantity.remove({ churrasco: churrasco._id });

        await Promise.all(itensquantity.map(async itemquantity => {
            const churrascoItens = new ItensQuantity({ ...itemquantity, churrasco: churrasco._id });

            await churrascoItens.save();

            churrasco.itensquantity.push(churrascoItens);
        }));

        await churrasco.save();

        return res.send({ churrasco });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating churrasco' })
    }
});

router.delete('/:churrascoId', async (req, res) => {
    try {
        await Churrasco.findByIdAndRemove(req.params.churrascoId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting churrasco' })
    }
});

module.exports = app => app.use('/churrascos', router);

