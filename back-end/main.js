Parse.Cloud.afterSave("Email", function(request) {
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
      email : emailAddress,
      name : name,
      keyword : keyword
    }
  }).then(function(httpResponse) {
    console.log(httpResponse.text);
  }, function(httpResponse) {
    console.error('Request failed ' + httpResponse.status);
  });
});


Parse.Cloud.afterSave("Event", function(request) {
    
    console.log(request.object); 
    request.log.info(request.object);
    
    // defining event variables  
    var eventKeyword = request.object.get("keyword"); 
    var title = request.object.get("title");
    var description = request.object.get("description"); 
    var location = request.object.get("location"); 
    
    // Query Email class
    
    
    
    // Check if keywords are equal 
    
    var emailList = [];
    
    // Return array of matches (email parse objects)
    
    var matchEmail = emailList.map(function(emailObject) {
        
        // Get keywordString
        
        var emailKeyword = emailObject.get("keywordString"); 
        
        // Alert front-end team to filter lowercase on event form save 

        
        if (emailKeyword === eventKeyword) {
            
                return emailObject;
            
            }
        
        
    }); 
    
            // Create array of recipient email
    
    var recipientList = matchEmail.map(function(matchedObject, emailKeyword) {
                                       
             //Get email address 
                                       
        var matchedEmail = matchedObject.get("email"); 
        var matchedName = matchedObject.get("name"); 
        
           return {     
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
                                       
    });  

}); 

