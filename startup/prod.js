const helmet = require('helmet');
const compression = require('compression');

module.exports = function (app) {
    app.use(helmet()); // middleware for security
    app.use(compression()); // middleware for making req load faster
};
