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
const passportLogin = require('../routes/passport-login');
const error = require('../middleware/error');

module.exports = function (app) {
    //! This is the 3rd party middleware to enable the CORS in the server side 
    app.use(cors());
    app.use(express.json()); // express middleware to parse the json data in the server 

    // *to limit the request of the api we have to put this middleware before the routes 
    // *we limit this to 10 req per 30s both GET and the POST request 
    //* we can either create a single middleware for all of the routes or create separate for each route

    //* this is using the middleware for all of the routes
    // app.use(rateLimit({
    //     windowMs: 30 * 1000, // 30s
    //     max: 1,
    //     message: "!!!! Too many request !!!! try again later...."
    // }));

    //* here we are using diff rateLimits for diff routes
    const apiLimiter = rateLimit({
        windowMs: 30 * 1000, // 30s
        max: 10,
        message: "!!!! Too many request !!!! try again later...."
    });

    const createAccountLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,  // 15mins
        max: 10,
        message: "Too many Accounts created in a small time span from this IP..... try again after some time!!!!"
    });

    app.use('/api/genres', apiLimiter, genres);
    app.use('/api/movies', apiLimiter, movies);
    app.use('/api/tvgenres', apiLimiter, tvgenres);
    app.use('/api/tvseries', apiLimiter, tvseries);
    app.use('/api/users', createAccountLimiter, users);
    app.use('/api/anime', apiLimiter, anime);
    app.use('/api/games', apiLimiter, games);
    app.use('/api/auth', apiLimiter, auth);
    app.use('/api/login', apiLimiter, passportLogin);
    app.use('/api/celebs', apiLimiter, celebs);
    app.use('/api/musicAlbum', apiLimiter, musicAlbum);
    app.use('/', home);
    app.use(error);
};
