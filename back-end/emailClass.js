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
       // campaign_id: "christmas_campaign",
       // return_path: "bounces-christmas-campaign@flintstone.com",
       // metadata: {
       //   user_type: "students"
       // },
       // substitution_data: {
       //   sender: "Big Store Team"
       // },
       recipients: [
         {
           return_path: "duncandirectory@covur.co",
           address: {
             email: email,
             name: name
           },
           // tags: [
           //   "greeting",
           //   "prehistoric",
           //   "fred",
           //   "flintstone"
           // ],
           // metadata: {
           //   place: "Bedrock"
           // },
           // substitution_data: {
           //   customer_type: "Platinum"
           // }
         }
       ],
       content: {
         from: {
           name: "Duncan Directory",
           email: "duncandirectory@covur.co"
         },
         subject: "Welcome to Duncan Directory!",
         reply_to: "Duncan Directory <duncandirectory@covur.co>",
         // headers: {
         //   "X-Customer-Campaign-ID": "christmas_campaign"
         // },
         text: "Hi " + name + "\n Welcome to Duncan Directory, a new online search directory created to help you navigate the new Duncan Student Center.",
         //html: "<p>Hi {{address.name}} \nSave big this Christmas in your area {{place}}! \nClick http://www.mysite.com and get huge discount\n</p><p>Hurry, this offer is only to {{customer_type}}\n</p><p>{{sender}}</p>"
       }
     }
   };

   // {
   //     content: {
   //       from: 'testing@covur.co',
   //       subject: 'test',
   //       html: '<html><body><p>Hello ' + name + '!</p></body></html>'
   //     },
   //     recipients: [
   //       {address: email}
   //     ]
   // }

    client.transmissions.send(options, function(err, json) {
        if (err) {
            console.log('There was an error...');
            // parse sparkpost error message
            console.log('error: ', err);
            // console.log('error description: ', err.errors[0].description);

            //res.status(err.statusCode).send([err.errors[0].message, err.errors[0].description]);
        } else {
            console.log('Sent Transmission!');
            // console.log(res.body);
            // send accepted and rejected numbers back to client
            // res.status(json.statusCode).send({
            //     accepted: json.body.results.total_accepted_recipients,
            //     rejected: json.body.results.total_rejected_recipients,
            //     id: json.body.results.id
            // });
        }
    })
};

module.exports = email;
