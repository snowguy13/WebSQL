var express = require("express"),
    app     = require("./app.js"),
    PORT    = 8080;

require("./api.js");

// Lastly, just try file fetch if all else fails
app.use("/", express.static( __dirname + "/public" ) );

// Begin listening for incoming requests
app.listen( PORT );