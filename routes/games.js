const { validate, Game } = require('../models/gameModel');
const { Genre } = require('../models/genreModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const games = await Game.find().sort({ title: 1 });
    res.send(games);
});

router.get('/titles', async (req, res) => {
    const games = await Game.find({}, { title: 1 }).sort({ title: 1 });
    res.send(games);
});

router.get('/briefinfo', async (req, res) => {
    const games = await Game.find(
        {},
        { title: 1, genre: 1, category: 1, rating: 1 }
    ).sort({ rating: 1 });
    res.send(games);
});

router.get('/:id', async (req, res) => {
    const games = await Game.findById(req.params.id);
    if (!games)
        return res.status(404).send('the given id of the game is not valid!!');
    res.send(games);
});

router.get('/titles/:title', async (req, res) => {
    const games = await Game.findOne({ title: req.params.title });
    if (!games)
        return res
            .status(404)
            .send('the game with the given title is not valid!!!');
    res.send(games);
});

router.get('top/top25', async (req, res) => {
    const games = await Game.find({}, { rating: 1, title: 1 }).sort({
        rating: -1,
        title: 1
    });
    res.send(games);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res
            .status(404)
            .send(
                'the genre id inputted is not valid please check the id !!!!'
            );

    const games = new Game({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },

        devTeam: req.body.devTeam,
        gameSeries: req.body.gameSeries,
        platforms: req.body.platforms,
        releasedDate: req.body.releasedDate,
        gameEngine: req.body.gameEngine,
        gameModes: req.body.gameModes,
        summary: req.body.summary,
        posters: req.body.posters,
        trailers: req.body.trailers,
        minSystemRequirement: req.body.minSystemRequirement,
        rating: req.body.rating,
        rated: req.body.rated,
        category: req.body.category,
        cast: req.body.cast,
        addOns: req.body.addOns,
        diffProducts: req.body.diffProducts,
        gameFacts: req.body.gameFacts,
        officialWebsite: req.body.officialWebsite,
        releasedState: req.body.releasedState,
        isPaid: req.body.isPaid
    });
    await games.save();
    res.send(games);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(erro.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(404).send('the given genre id is not valid!!!');

    const games = await Game.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },

            devTeam: req.body.devTeam,
            gameSeries: req.body.gameSeries,
            platforms: req.body.platforms,
            releasedDate: req.body.releasedDate,
            gameEngine: req.body.gameEngine,
            gameModes: req.body.gameModes,
            summary: req.body.summary,
            posters: req.body.posters,
            trailers: req.body.trailers,
            minSystemRequirement: req.body.minSystemRequirement,
            rating: req.body.rating,
            rated: req.body.rated,
            category: req.body.category,
            cast: req.body.cast,
            addOns: req.body.addOns,
            diffProducts: req.body.diffProducts,
            gameFacts: req.body.gameFacts,
            officialWebsite: req.body.officialWebsite,
            releasedState: req.body.releasedState,
            isPaid: req.body.isPaid
        },
        { new: true }
    );
    if (!games)
        return res
            .status(404)
            .send('the game with the given id is not found!!!');
    res.send(games);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const games = await Game.findByIdAndRemove(req.params.id);
    if (!games)
        return res
            .status(404)
            .send('the game with the given id is not found!!!');
    res.send(games);
});

module.exports = router;
