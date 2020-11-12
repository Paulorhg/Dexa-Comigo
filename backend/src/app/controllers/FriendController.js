const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Friend = require('../Model/Friend');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const user = req.userId;

    try {
        const friend = await Friend.find({ $or: [{user1: user}, {user2: user}] }).populate(['user1', 'user2']);

        return res.send({ friend });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading friend' })
    }
});

router.get('/:amigoId', async (req, res) => {
    try {
        const friend = await friend.findById(req.params.friendId).populate(['user1', 'user2']);

        return res.send({ friend });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading friend' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { user2 } = req.body;
        const accept = false; 
        const friend = await Friend.create({ user1: req.userId, user2, accept });

        await friend.save();

        return res.send({ friend });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new friend' })
    }
});

router.put('/:amigoId', async (req, res) => {
    try {

        const { accept } = req.body;

        const friend = await Friend.findByIdAndUpdate(req.params.friendId, { accept }, { new: true });

        await friend.save();

        return res.send({ friend });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating friend' })
    }
});

router.delete('/:amigoId', async (req, res) => {
    try {
        await Friend.findByIdAndRemove(req.params.friendId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting friend' })
    }
});

module.exports = app => app.use('/amigos', router);

