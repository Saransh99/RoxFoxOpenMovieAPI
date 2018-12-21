const helmet = require('helmet');
const csp = require('helmet-csp');  // alternate package for the content security policy
const uuidv4 = require('uuid/v4');
const compression = require('compression');
const expectCt = require('expect-ct');
const featurePolicy = require('feature-policy');
const hpp = require('hpp');
const bodyParser = require('body-parser');

module.exports = function (app) {
    
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(hpp());// express middleware to protect against HTTP Parameter Pollution attacks
    
    app.use(helmet()); // middleware for security
    app.use(helmet.noCache());
    app.use(helmet.referrerPolicy({policy: 'same-origin'}));
    app.use(helmet.permittedCrossDomainPolicies());

    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            upgradeInsecureRequests: true,
            workerSrc: false
        },
        browserSniff: false,
        disableAndroid: true
    }));

    // Sets "X-Download-Options: noopen".
    // This will prevent old versions of Internet Explorer from allowing malicious HTML downloads to be executed in the context of your site.
    app.use(helmet.ieNoOpen());

    // Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
    const sixtyDaysInSeconds = 5184000;
        app.use(helmet.hsts({
        maxAge: sixtyDaysInSeconds
    }));

    app.use(featurePolicy({
        features: {
            fullscreen: ["'self'"],
            vibrate: ["'none'"],
            syncXhr: ["'none'"]
        }
    }));

    // Expect-ct
    app.use(expectCt({
        maxAge:86400,
        enforce: true,
        reportUri: ''    // add a report uri
    }));

    //dynamically generate nonces to allow inline <script> tags to be safely evaluated.
    
    app.use((req, res, next)=>{
        res.locals.nonce = uuidv4();
        next();
      });
      
    app.use(csp({
        directives: {
            scriptSrc: [
                "'self'",
                (req, res) => `'nonce-${res.locals.nonce}'`  // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
            ]
        }
    }));
      
    app.use((req, res)=>{
        res.end(`<script nonce="${res.locals.nonce}">alert(1 + 1);</script>`);
    });

    // middleware for making req load faster
    app.use(compression()); 
};
