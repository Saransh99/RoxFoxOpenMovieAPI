const express = require('express');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const tvgenres = require('../routes/tvgenres');
const tvseries = require('../routes/tvseries');
const users = require('../routes/users');
const anime = require('../routes/anime');
const games = require('../routes/games');
const home = require('../routes/home');
const error = require('../middleware/error');

module.exports = function(app){

    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/tvgenres', tvgenres);
    app.use('/api/tvseries', tvseries);
    app.use('/api/users', users);
    app.use('/api/anime', anime);
    app.use('/api/games', games);
    app.use('/', home);
    app.use(error);
}