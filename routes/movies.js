const { Movie, validate } = require('../models/movieModel');
const { Genre } = require('../models/genreModel');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

//* we can find the movies by using diff fields if we want to show them
//* Movie.find({}, {title: 1}).sort({title: 1});  // this will show only the titles of the movies by sorting them in the asc order
//* Movie.find({}, {"genre.name":1})   // this will get the name prop of the genre object

// TODO: also implement finding the movie by providing the name of the movie

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ title: 1 }); // sorting by the title and will display only the titles of the movies
    res.send(movies);
});

// show only the movies titles
router.get('/titles', async (req, res) => {
    const movies = await Movie.find({}, { title: 1 }).sort({ title: 1 });
    res.send(movies);
});

// show brief info about the movies
router.get('/briefinfo', async (req, res) => {
    const movies = await Movie.find(
        {},
        { title: 1, director: 1, genre: 1, category: 1 }
    ).sort({ title: 1 });
    res.send(movies);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
        return res
            .status(404)
            .send('the movie with the given id was not found!!');
    res.send(movie);
});

// get the movies by the titles
router.get('/titles/:title', async (req, res) => {
    const movie = await Movie.findOne({ title: req.params.title });
    if (!movie)
        return res
            .status(404)
            .send('the movie withe the given title is not valid!!');
    res.send(movie);
});

// *get the top rated movies
router.get('/top/top25', async (req, res) => {
    const movie = await Movie.find({}, { title: 1, imdbRating: 1 }).sort({
        imdbRating: -1,
        title: 1
    }); // showing the movies withe title and rating only with sorting acc to the rating and the title
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid  Genre');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        director: req.body.director,
        writers: req.body.writers,
        cast: req.body.cast,
        awards: req.body.awards,
        storyLine: req.body.storyLine,
        plot: req.body.plot,
        tagLine: req.body.tagLine,
        details: req.body.details,
        filmingLocations: req.body.filmingLocations,
        rated: req.body.rated,
        runtime: req.body.runtime,
        boxOffice: req.body.boxOffice,
        technicalSpecs: req.body.technicalSpecs,
        images: req.body.images,
        trailers: req.body.trailers,
        imdbRating: req.body.imdbRating,
        category: req.body.category,
        tags: req.body.tags
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid genre id!!');

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            director: req.body.director,
            writers: req.body.writers,
            cast: req.body.cast,
            awards: req.body.awards,
            storyLine: req.body.storyLine,
            plot: req.body.plot,
            tagLine: req.body.tagLine,
            details: req.body.details,
            filmingLocations: req.body.filmingLocations,
            rated: req.body.rated,
            runtime: req.body.runtime,
            boxOffice: req.body.boxOffice,
            technicalSpecs: req.body.technicalSpecs,
            images: req.body.images,
            trailers: req.body.trailers,
            imdbRating: req.body.imdbRating,
            category: req.body.category,
            tags: req.body.tags,
            releasedDate: req.body.releasedDate
        },
        { new: true }
    );

    if (!movie)
        return res
            .status(404)
            .send('The movie with the given id was not found!!');
    res.send(movie);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie)
        return res
            .status(404)
            .send('the movie with the given id was not found');
    res.send(movie);
});

module.exports = router;
