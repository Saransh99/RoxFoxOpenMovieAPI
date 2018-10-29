const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const tvgenres = require('../routes/tvgenres');
const tvseries = require('../routes/tvseries');
const users = require('../routes/users');
const anime = require('../routes/anime');
const games = require('../routes/games');
const auth = require('../routes/auth');
const home = require('../routes/home');
const celebs = require('../routes/celebs');
const musicAlbum = require('../routes/musicAlbum');
const error = require('../middleware/error');

module.exports = function (app) {
    //! This is the 3rd party middleware to enable the cors in the server side 
    app.use(cors());
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/tvgenres', tvgenres);
    app.use('/api/tvseries', tvseries);
    app.use('/api/users', users);
    app.use('/api/anime', anime);
    app.use('/api/games', games);
    app.use('/api/auth', auth);
    app.use('/api/celebs', celebs);
    app.use('/api/musicAlbum', musicAlbum);
    app.use('/', home);

    // *to limit the request of the api 
    app.use(rateLimit({
        windowMs: 30 * 1000, // 30s
        max: 10
    }));
    app.use(error);
};
