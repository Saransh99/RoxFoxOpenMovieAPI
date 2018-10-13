const {Movie, validate} = require('../models/movieModel');
const {Genre} = require('../models/genreModel');

const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{

    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('the movie with the given id was not found!!');
    res.send(movie);
});

router.get('/:title', async(req,res)=>{
    const movie = await Movie.findOne(req.params.title,{title: 1});
    if(!movie) return res.status(404).send('the movie with the given name is not available!!!');
    res.send(movie);
});

router.post('/', async (req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid  Genre');

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

router.put('/:id', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid genre id!!');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {

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
        technicalSpecs: req.body.technicalSpecs

    }, {new: true});

    if(!movie) return res.status(404).send('The movie with the given id was not found!!');
    res.send(movie);
});

router.delete('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('the movie with the given id was not found');
    res.send(movie);
});

module.exports = router;