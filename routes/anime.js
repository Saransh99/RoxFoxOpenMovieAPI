const {Genre} = require('../models/genreModel');
const {validate, Anime} = require('../models/animeModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{

});

router.get('/:id', validateObjectId, async(req, res)=>{

});

router.post('/', auth, async(req, res)=>{

});

router.put('/:id', [auth, validateObjectId], async(req, res)=>{

});

router.delete('/:id', [auth, admin, validateObjectId], async(req, res)=>{

});


module.exports = router;