const { Genre } = require('../models/genreModel');
const { validate, Anime } = require('../models/animeModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const anime = await Anime.find().sort({ title: 1 });
    res.send(anime);
});

// showing only the titles of the anime and sorting them by the titles
router.get('/titles', async (req, res) => {
    const anime = await Anime.find({}, { title: 1 }).sort({ title: 1 });
    res.send(anime);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const anime = await Anime.findById(req.params.id);
    if (!anime)
        return res
            .status(404)
            .send('the anime with the given id is not found!!!');
    res.send(anime);
});

// * getting the animes title with the rating

router.get('/top/top25', async (req, res) => {
    const anime = await Anime.find({}, { imdbRating: 1, title: 1 }).sort({
        imdbRating: -1,
        title: 1
    });
    res.send(anime);
});

//* getting the anime by the title passing as the param in the URL
router.get('/titles/:title', async (req, res) => {
    const anime = await Anime.find({ title: req.params.title }, { title: 1 }); // *will show the title only
    if (!anime)
        res.status(404).send('the anime with the given name is not valid!!!!');
    res.send(anime);
});

// *post only with the auth token
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid  Genre of the anime!!!');

    const anime = new Anime({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        cast: req.body.cast,
        awards: req.body.awards,
        storyLine: req.body.storyLine,
        plot: req.body.plot,
        tagLine: req.body.tagLine,
        details: req.body.details,
        rated: req.body.rated,
        runtime: req.body.runtime,
        boxOffice: req.body.boxOffice,
        technicalSpecs: req.body.technicalSpecs,
        images: req.body.images,
        trailers: req.body.trailers,
        imdbRating: req.body.imdbRating,
        category: req.body.category,
        tags: req.body.tags,
        creators: req.body.creators,
        seasons: req.body.seasons,
        episodes: req.body.episodes
    });
    await anime.save();
    res.send(anime);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Invalid tv genre id!!!!');

    const anime = await Anime.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            cast: req.body.cast,
            awards: req.body.awards,
            storyLine: req.body.storyLine,
            plot: req.body.plot,
            tagLine: req.body.tagLine,
            details: req.body.details,
            rated: req.body.rated,
            runtime: req.body.runtime,
            boxOffice: req.body.boxOffice,
            technicalSpecs: req.body.technicalSpecs,
            images: req.body.images,
            trailers: req.body.trailers,
            imdbRating: req.body.imdbRating,
            category: req.body.category,
            tags: req.body.tags,
            creators: req.body.creators,
            seasons: req.body.seasons,
            episodes: req.body.episodes
        },
        { new: true }
    );

    if (!anime)
        return res
            .status(404)
            .send('the anime with the given id was not found!!!');
    res.send(anime);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const anime = await Anime.findByIdAndRemove(req.params.id);
    if (!anime)
        res.status(404).send('the anime with the given id is not valid!!!');
    res.send(anime);
});

module.exports = router;
