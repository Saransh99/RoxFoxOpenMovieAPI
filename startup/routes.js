const express = require('express');
const favicon = require('serve-favicon');
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
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const contentLength = require('express-content-length-validator');
const passportGoogle = require('../passport/passport-google');
const passportTwitter = require('../passport/passport-twitter');
const passportGitHub = require('../passport/passport-github');
const passportFacebook = require('../passport/passport-facebook');

module.exports = function (app) {

    app.use(favicon(path.join(__dirname, '../views', 'favicon.png'))); // !!!! check this is not working 
    
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



    // This is the Morgan daily logger folder
    // this will create a accessfile daily 

    let logDirectory = path.join(__dirname, '../logs')
 
    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    let accessLogStream = rfs('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory
      })

    // we are logging all the req to the access.log file using the morgan 
    //let accessStreamLog = fs.createWriteStream(path.join(__dirname, '../access.log'), {flags: 'a'});
    app.use(morgan('combined', {stream: accessLogStream}));


    const MAX_CONTENT_LENGTH_ACCEPTED = 9999;
    app.use(contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED}));

    
    app.use('/api/genres', apiLimiter, genres);
    app.use('/api/movies', apiLimiter, movies);
    app.use('/api/tvgenres', apiLimiter, tvgenres);
    app.use('/api/tvseries', apiLimiter, tvseries);
    app.use('/api/users', createAccountLimiter, users);
    app.use('/api/anime', apiLimiter, anime);
    app.use('/api/games', apiLimiter, games);
    app.use('/api/auth', apiLimiter, auth);
    app.use('/api/celebs', apiLimiter, celebs);
    app.use('/api/musicAlbum', apiLimiter, musicAlbum);
    app.use('/', home);
    app.use(error);

};
