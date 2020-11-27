const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Churrasco = require('../Model/Churrasco');
const ItensQuantity = require('../Model/ItensQuantity');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const user = req.userId;
    try {
        const churrascos = await Churrasco.find({ owner: user }).populate(['owner', 'itensquantity', 'participantes']);
        return res.send({ churrascos });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading churrascos' })
    }
});

router.get('/:churrascoId', async (req, res) => {
    try {
        const churrasco = await Churrasco.findById(req.params.churrascoId).populate(['owner', 'itensquantity']);
        return res.send({ churrasco });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading churrasco' })
    }
});

router.get('/passado/:dataHoje', async (req, res) => {
    const user = req.userId;
    try {
        const churrascos = await Churrasco.find({
            $and: [
                { date: { $lt: req.params.dataHoje } },
                { owner: user }
            ]
        }).populate(['user', 'itensquantity', 'participantes']);
        return res.send({ churrascos });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading churrasco' })
    }
});

router.get('/futuro/:dataHoje', async (req, res) => {
    const user = req.userId;
    try {
        const churrascos = await Churrasco.find({
            $and: [
                { date: { $gt: req.params.dataHoje } },
                { owner: user }
            ]
        }).populate(['user', 'itensquantity', 'participantes']);
        return res.send({ churrascos });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading churrasco' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { name, date, participantes, itensquantity } = req.body;

        const churrasco = await Churrasco.create({ name, date, participantes, owner: req.userId });

        await Promise.all(itensquantity.map(async itemquantity => {
            const churrascoItens = new ItensQuantity({ ...itemquantity, churrasco: churrasco._id });

            await churrascoItens.save();

            churrasco.itensquantity.push(churrascoItens);
        }));

        await churrasco.save();

        return res.send({ churrasco });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new churrasco' })
    }
});

router.put('/:churrascoId', async (req, res) => {
    try {

        const { name, date, itensquantity, participantes } = req.body;

        const churrasco = await Churrasco.findByIdAndUpdate(req.params.churrascoId, { name, date, participantes }, { new: true });

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

