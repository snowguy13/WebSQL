var $ = require("jquery");

var tryConnection = function( data, success ) {
  $.ajax({
    type:    "PUT",
    url:     "/api/connection",
    data:    data,
    success: success
  });
};

// On document ready
$(function() {
  var loginForm = $("#db-login-form"),
      button    = $( loginForm.prop("connect") );
  
  // On input, check if all necessary fields are filled
  loginForm.on("input", function() {
    var allFilled = [ "host", "database", "username", "password" ].every(function( prop ) {
      return !!loginForm.prop( prop ).value;
    });

    if( allFilled ) {
      button.removeAttr("disabled");
    } else {
      button.attr("disabled", "");
    }
  });

  // On [enter], try to "click" the connect button
  loginForm.keydown(function( ev ) {
    var key = ev.keyCode || ev.which;

    if( key === 13 && !button.is(":disabled") ) {
      button.click();
    }
  });

  // For [host], auto-fill http:// if no prefix is found
  /*$( loginForm.prop("host") ).blur(function() {
    var val = this.value;

    if( val && !/^[A-Za-z]+\:\/\//.test( val ) ) {
      this.value = "http://" + val;
    }
  });*/

  // On button click, disable form, send AJAX, and wait for response
  button.click(function() {
    var formEl = loginForm[ 0 ];

    loginForm
      .addClass("loading")
      .find("input")
      .attr("disabled", "");
    
    tryConnection({
      host:     formEl.host.value,
      database: formEl.database.value,
      username: formEl.username.value,
      password: formEl.password.value,
      port:     formEl.port.value || 3306
    }, function( res ) {
      loginForm
        .removeClass("loading")
        .find("input")
        .removeAttr("disabled");
    });
  });
});