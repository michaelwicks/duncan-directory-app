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
