var app = require("./app.js");
var CM  = require("./modules/ConnectionManager.js");

var makeTokenPart = function() {
  return "" + Math.random().toString( 36 ).slice( -8 );
};

var generateToken = function( count ) {
  var token = "";

  while( count-- > 0 ) {
    token += makeTokenPart();
  }

  return token;
};

// Returns the session token (creates one if it doesn't exist)
app.get("/api/session", function( req, res ) {
  var session = req.session;

  // Create an id if necessary
  if( session.token === undefined ) {
    req.session.token = generateToken( 4 );
  }
  
  // Return the id
  res.send( req.session.token );
});

// Deletes the current session, deleting the corresponding connection if necessary
// This should only be called on page unload
app.delete("/api/session", function( req, res ) {
  CM.end( req.session.token );
  req.session.destroy();
});

// 