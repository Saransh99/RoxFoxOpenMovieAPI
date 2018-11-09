const { Genre, validate } = require('../models/genreModel');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find({}, { name: 1 }).sort({ name: 1 }); // sorting the title by showing only name of the genre
    res.send(genres);
});


router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(404).redirect('index');

    res.send(genre);
});

// !can post only if authorized
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    if (!genre)
        return res.status(404).send('the genre with the given id is not valid');

    res.send(genre);
});
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
        return res.status(404).send('the Genre with the given id is not valid');

    res.send(genre);
});

module.exports = router;
