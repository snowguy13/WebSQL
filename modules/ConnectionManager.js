var mysql       = require("mysql"),
    connections = {};

module.exports = {
  connect: function( token, options, callback ) {
    var connection = connections[ token ];
    
    // End the connection if it exists
    connection && connection.end();
    
    // Start the new one
    (connections[ token ] = mysql.createConnection( options )).connect( callback );
  },

  query: function( token, query, callback ) {
    var connection = connections[ token ];

    // Execute the query if there's a connection
    connection && connection.query( query, callback );
  },

  end: function( token, callback ) {
    var connection = connections[ token ];
    
    // If there's a connection...
    if( connection ) {
      // ... end it and clear the reference
      connection.end( callback );
      delete connections[ token ];
    }
  }
};