Parse.Cloud.afterSave("Email", function (request) {
    console.log(request.object);
    request.log.info(request.object);
    var emailAddress = request.object.get("email");
    var name = request.object.get("name");
    var keyword = request.object.get("keyword");
    console.log('email address: ', emailAddress);
    console.log('name: ', name);
    console.log('keyword: ', keyword);

    Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'http://162.243.173.198/testemail',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: {
            email: emailAddress,
            name: name,
            keyword: keyword
        }
    }).then(function (httpResponse) {
        console.log(httpResponse.text);
    }, function (httpResponse) {
        console.error('Request failed ' + httpResponse.status);
    });
});


Parse.Cloud.afterSave("Event", function(request) {

    // defining event variables  
    var eventKeyword = request.object.get("keyword");
    var title = request.object.get("title");
    var description = request.object.get("description");
    var location = request.object.get("location");

    // Query Email class
    var Email = Parse.Object.extend("Email")
    var query = new Parse.Query(Email) 

    var recipientList = []; // defines recipientList as blank array;
    var matchedEmail = '';
    var matchedName = '';

    // Loop through each Email object from parse and identify keyword matches
    query.each(function (emailObject, error) {

        // Get keywordString (keyword in parse Email class)
        var emailKeyword = emailObject.get("keywordString");

        if (emailKeyword === eventKeyword) {

            // Get email address
            matchedEmail = emailObject.get("email");
            matchedName = emailObject.get("name");

            // create recipient list array    
            var recipient =

                {
                    "address": {
                        "email": matchedEmail,
                        "name": matchedName
                    },
                    "tags": [],
                    "metadata": {},
                    "substitution_data": {
                        "name": matchedName,
                        "keyword": emailKeyword
                    }
                }

            recipientList.push(recipient); // pushes recipient data into recipientList array
        }

    }, {
        useMasterKey: true
    }).then(function () {  

    // Send HTTP request to app.js only after query.each() process is complete
        Parse.Cloud.httpRequest({
            method: 'POST',
            url: 'http://162.243.173.198/eventemail', 
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },

            body: {
                email: recipientList,
                eventTitle: title,
                eventDescription: description,
                eventLocation: location,
            }

        }).then(function (httpResponse) {
            console.log(httpResponse.text);
        }, function (httpResponse) {
            console.error('Request failed ' + httpResponse.status);
        });
    });

});
