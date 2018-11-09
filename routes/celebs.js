const { validate, Celeb } = require('../models/celebsModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const celeb = await Celeb.find().sort({ name: 1 });
    res.send(celeb);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const celeb = new Celeb({

        name: req.body.name,
        born: req.body.born,
        residence: req.body.residence,
        education: req.body.education,
        yearsActive: req.body.yearsActive,
        spouses: req.body.spouses,
        children: req.body.children,
        parents: req.body.parents,
        height: req.body.height,
        age: req.body.age,
        isAlive: req.body.isAlive,
        netWorth: req.body.netWorth,
        movies: req.body.movies,
        tvSeries: req.body.tvSeries,
        posters: req.body.posters,
        upcomingProjects: req.body.upcomingProjects,
        quotes: req.body.quotes,
        about: req.body.about,
        socialProfiles: req.body.socialProfiles,
        wikipediaPage: req.body.wikipediaPage,
        tags: req.body.tags
    });
    await celeb.save();
    res.send(celeb);
});

module.exports = router;