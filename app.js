var express      = require("express"),
    session      = require("express-session"),
    cookieParser = require("cookie-parser"),
    bodyParser   = require("body-parser"),

    app = express();

// Add support for various types of POST bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
})); 

// Add support for session variables
app.use( cookieParser() );
app.use( session({
  secret: 'Iguessthisisnotasecretnow',
  resave: false,
  saveUninitialized: false
}));

// On empty URL, just load index
app.use(/\/?/, function( req, res ) {
  res.sendFile( __dirname + "/public/index.htm" );
});

// Export the app
module.exports = app;