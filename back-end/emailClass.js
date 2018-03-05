var sparkpost = require('sparkpost');
var client = new sparkpost('4d845b839f15de6aad51df8c36a22cf3773815af');

var email = {};

email.send = function(email, name, keyword) {

    var options = {
        transmissionBody: {
            options: {
             open_tracking: true,
             click_tracking: true
            },
        recipients: [
            {
                return_path: "duncandirectory@covur.co",
                address: {
                    email: email,
                    name: name
                },
            }
        ],
        content: {
            from: {
                name: "Duncan Directory",
                email: "duncandirectory@covur.co"
            },
            subject: "Welcome to Duncan Directory!",
            reply_to: "Duncan Directory <duncandirectory@covur.co>",
            text: "Hi " + name + "\n Welcome to Duncan Directory, a new online search directory created to help you navigate the new Duncan Student Center.",
        }
    };

    client.transmissions.send(options, function(err, json) {
        if (err) {
            // parse sparkpost error message
            console.log('error: ', err);
        } else {
            console.log('Sent Transmission!');
        }
    })
};

module.exports = email;
