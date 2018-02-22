var sparkpost = require('sparkpost');
//write email class...
var email = {};
email.send = send;
function send(emailAddress, name, keyword){
  console.log("email sent")
}
module.exports = email;
