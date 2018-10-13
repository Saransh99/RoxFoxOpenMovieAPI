const {TvGenre, validate} = require('../models/tvgenreModel');

const express = require('express');
const router = express.Router();


router.get('/', async (req,res)=>{
    const tvgenres = await TvGenre.find().sort('name');
    res.send(tvgenres);
});

router.post('/', async (req, res)=>{

    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let tvgenre = new TvGenre({name: req.body.name});
    tvgenre = await tvgenre.save();

    res.send(tvgenre);
});

// router.put('/:id', async(req, res)=>{
//     const 
// });

module.exports = router;