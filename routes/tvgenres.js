const {TvGenre, validate} = require('../models/tvgenreModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();


router.get('/', async (req,res)=>{
    const tvgenres = await TvGenre.find().sort('name');
    res.send(tvgenres);
});

router.get('/:id', validateObjectId, async(req, res)=>{
    const tvgenre = await TvGenre.findById(req.params.id);
    if(!tvgenre) return res.status(404).send('the tvgenre with the given id is not valid!!!!');
    res.send(tvgenre);
});

router.post('/', auth, async (req, res)=>{

    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let tvgenre = new TvGenre({name: req.body.name});
    tvgenre = await tvgenre.save();

    res.send(tvgenre);
});

router.put('/:id', [auth, validateObjectId], async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const tvgenre = await TvGenre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if(!tvgenre) return res.status(404).send('the tvgenre with the given id is not valid!!!');

    res.send(tvgenre);
});

router.delete('/:id', [auth, admin, validateObjectId], async(req, res)=>{
    const tvgenre = await TvGenre.findByIdAndRemove(req.params.id);
    if(!tvgenre) return res.status(404).send('the tv genre with the given id is not valid!!!');
    res.send(tvgenre);

});

module.exports = router;