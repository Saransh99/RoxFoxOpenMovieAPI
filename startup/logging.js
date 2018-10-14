const winston = require('winston');
require('express-async-errors');

module.exports = function(){
    // * handling and logging errors using winston 
    winston.exceptions.handle(new winston.transports.File({filename: 'uncaughtExceptions.log'}));

    process.on('unhandledRejection', (ex)=>{
        // console.log('GoT the unhandled rejection!!');
        throw ex;
    });

    const winstonLogger = winston.createLogger({
        level:'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({filename: 'logfile.log', level: 'error'})
        ]
    });

    winston.add(winstonLogger);

}