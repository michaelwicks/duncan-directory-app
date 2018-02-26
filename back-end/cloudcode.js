var email = require('email.js');
var Parse = require('parse')

var emailAddress = Parse.Object("email");
var name = Parse.Object("name");
var keyword = Parse.Object("keyword");

Parse.Cloud.afterSave("email", function(request) {
    email.send(emailAddress, name, keyword)
  };

  // aftersave() {
  //    email.send(email, name, ...)
  //}
