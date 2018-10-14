const {Genre, validate} = require('../models/genreModel');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();


router.get('/', async (req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// !can post only if authorized
router.post('/', auth, async (req, res)=>{

    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();

    res.send(genre);
});

// router.put('/:id', async(req, res)=>{
//     const 
// });

module.exports = router;