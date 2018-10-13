const express = require('express');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const tvgenres = require('../routes/tvgenres');
const tvseries = require('../routes/tvseries');


module.exports = function(app){

    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/tvgenres', tvgenres);
    app.use('/api/tvseries', tvseries);
}