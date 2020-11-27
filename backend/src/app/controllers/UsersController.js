const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../Model/User');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const user = await User.find().populate(['user']);

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading user' })
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log(user)
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading user' })
    }
});

router.get('/email/:userEmail', async (req, res) => {
    try {
        const email = req.params.userEmail
        const user = await User.findOne({ email });
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading user' })
    }
});

// router.post('/', async (req, res) => {
//     try {

//         const { name, date, itensquantity } = req.body;

//         const churrasco = await Churrasco.create({ name, date, owner: req.userId });

//         await Promise.all(itensquantity.map(async itemquantity => {
//             const churrascoItens = new ItensQuantity({ ...itemquantity, churrasco: churrasco._id });

//             await churrascoItens.save();

//             churrasco.itensquantity.push(churrascoItens);
//         }));

//         await churrasco.save();

//         return res.send({ churrasco });
//     } catch (err) {
//         return res.status(400).send({ error: 'Error creating new churrasco' })
//     }
// });

// router.put('/:usersId', async (req, res) => {
//     try {

//         const { name, date, itensquantity } = req.body;

//         const user = await User.findByIdAndUpdate(req.params.userId, { name, date }, { new: true });

//         user.itensquantity = [];
//         await ItensQuantity.remove({ user: user._id });

//         await Promise.all(itensquantity.map(async itemquantity => {
//             const userItens = new ItensQuantity({ ...itemquantity, user: user._id });

//             await userItens.save();

//             user.itensquantity.push(userItens);
//         }));

//         await user.save();

//         return res.send({ user });
//     } catch (err) {
//         return res.status(400).send({ error: 'Error updating user' })
//     }
// });

// router.delete('/:churrascoId', async (req, res) => {
//     try {
//         await Churrasco.findByIdAndRemove(req.params.churrascoId);

//         return res.send();
//     } catch (err) {
//         return res.status(400).send({ error: 'Error deleting churrasco' })
//     }
// });

module.exports = app => app.use('/users', router);

