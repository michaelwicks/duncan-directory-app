//var email = require('email.js');
// var Parse = require('parse')
//
// console.log("test main");

Parse.Cloud.afterSave("Email", function(request) {
  console.log("Parse.CLoud.afterSave: ");
  request.log.info("Parse.Cloud.afterSave: ");
  // var Email = Parse.Object("Email");
  // var emailAddress = Email.get("email");
  // var name = Email.get("name");
  // var keyword = Email.get("keyword");
  //email.send(emailAddress, name, keyword);
});
