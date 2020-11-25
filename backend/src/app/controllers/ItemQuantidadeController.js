const express = require('express');
const authMiddleware = require('../middlewares/auth');

const ItemQuantity = require('../Model/ItemQuantity');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const itensQuant = await ItemQuantity.find();

        return res.send({ itensQuant });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading itens' })
    }
});

router.get('/:itemQuantId', async (req, res) => {
    try {
        const itemQuant = await ItemQuantity.findById(req.params.itemQuantId);

        return res.send({ itemQuant });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading item' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { item, quantity } = req.body;

        const itemQuant = await ItemQuantity.create({ item, quantity});

        await itemQuant.save();

        return res.send({ itemQuant });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new item' })
    }
});

router.put('/:itemQuantId', async (req, res) => {
    try {

        const { item, quantity } = req.body;

        const itemQuant = await ItemQuantity.findByIdAndUpdate(req.params.itemQuantId, { item, quantity }, { new: true });

        await itemQuant.save();

        return res.send({ itemQuant });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating item' })
    }
});

router.delete('/:itemQuantId', async (req, res) => {
    try {
        await ItemQuantity.findByIdAndRemove(req.params.itemQuantId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting item' })
    }
});

module.exports = app => app.use('/itemQuant', router);