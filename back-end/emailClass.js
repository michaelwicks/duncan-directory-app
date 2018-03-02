var sparkpost = require('sparkpost');
var client = new sparkpost('4d845b839f15de6aad51df8c36a22cf3773815af');

var email = {};

email.send = function(email, name, keyword) {
    client.transmissions.send({
        content: {
          from: 'testing@covur.co',
          subject: 'test',
          html: '<html><body><p>Hello ' + name + '!</p></body></html>'
        },
        recipients: [
          {address: email}
        ]
      })
      .then(data => {
        console.log('Success!');
        console.log(data);
      })
      .catch(err => {
        console.log('Failure');
        console.log(err);
      });
}

module.exports = email;
