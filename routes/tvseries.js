const {validate, Tvseries} = require('../models/tvseriesModel');
const {TvGenre} = require('../models/tvgenreModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();


router.get('/', async(req, res)=>{
    const tvseries = await Tvseries.find().sort('title');
    res.send(tvseries); 
});

router.get('/:id', validateObjectId,async(req,res)=>{
    const tvseries = await Tvseries.findById(req.params.id);
    if(!tvseries) return res.status(404).send('the tvseries with the given id was not found');
    res.send(tvseries);
});

// ! can't post without the auth token
router.post('/', auth, async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const tvgenre = await TvGenre.findById(req.body.tvGenreId);
    if(!tvgenre) return res.status(400).send('invalid  Genre of the tv series');

    const tvseries = new Tvseries({
        
        title: req.body.title,
        tvGenre: {
            _id: tvgenre._id,
            name: tvgenre.name
        },
        cast: req.body.cast,
        awards: req.body.awards,
        storyLine: req.body.storyLine,
        plot: req.body.plot,
        tagLine: req.body.tagLine,
        details: req.body.details,
        filmingLocations: req.body.filmingLocations,
        rated: req.body.rated,
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
    await tvseries.save();
    res.send(tvseries);

});

router.put('/:id', [auth, validateObjectId], async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const tvgenre = await TvGenre.findById(req.params.id);
    if(!tvgenre) return res.status(404).send('Invalid tv genre id!!!!');

    const tvseries = await Tvseries.findByIdAndUpdate(req.params.id, {

        title: req.body.title,
        tvGenre: {
            _id: tvgenre._id,
            name: tvgenre.name
        },
        cast: req.body.cast,
        awards: req.body.awards,
        storyLine: req.body.storyLine,
        plot: req.body.plot,
        tagLine: req.body.tagLine,
        details: req.body.details,
        filmingLocations: req.body.filmingLocations,
        rated: req.body.rated,
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

    },{new: true});

    if(!tvseries) return res.status(404).send('the tvseries with the given id was not found!!!');
    res.send(tvseries);
});

router.delete('/:id', [auth, admin, validateObjectId], async(req,res)=>{

    const tvseries = await Tvseries.findByIdAndRemove(req.params.id);
    if(!tvseries) return res.status(404).send('the tvseries with the given id was not found!!');
    res.send(tvseries);
});

module.exports = router;