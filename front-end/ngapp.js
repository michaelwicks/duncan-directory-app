var DuncanApp = angular.module('DuncanApp', ['ngRoute', 'ngResource','ngParse']);

DuncanApp.config(function ($routeProvider) {
    $routeProvider
    
    .when ('/', {
        
        templateUrl: 'main.html',
        controller: 'mainController'
    })
    
    .when ('/results.html', {
        
        templateUrl: 'results.html',
        controller: 'parseResultsController'
    })
    
    .when ('/images.html', {
        templateUrl: 'images.html',
        controller: 'resultsController'
    })
});
       
// Parse config
DuncanApp.config(['ParseProvider', function ($ParseProvider){
    var MY_PARSE_APP_ID = '9327d28c-7570-4e88-9aa1-cc6a5df15c68';
    var MY_PARSE_JS_KEY = 'fzXgwX07mQvNIefKjBnTY5fvNJMJTv2s';
    $ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
    $ParseProvider.serverURL = 'https://api.parse.buddy.com/parse/';
}]);


// Parse query
DuncanApp.controller('parseResultsController', ['$scope', 'Parse', function($scope, Parse, searchInput){
    var Keyword = Parse.Object.extend("Keyword")
    
    var query = new Parse.Query(Keyword) 
    query.get("O6uH8WFHt3", {
        success: function(kw){
            console.log(kw);
        },
    error: function(object, error){
        console.log(error);
    }
    });
//    new Parse.Query(searchInput)
//        .include('hours')
//        .find()
//        .then(function(response){
//        console.log(response)
//        $scope.results = response;
//    })
//    .catch(function(err) {
//        $scope.error = err;
//    }); 
}]);


// SERVICES
DuncanApp.service('duncanService', ['$http', '$q', function($http, $q) {

    this.search = function(searchInput){
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/search?keyword=' + searchInput
         }).then(function successCallback(response) {
                console.log(response.data);
                return (response.data);
            }, function errorCallback(response) {

            });
    }

    
}]);

DuncanApp.service('imageService', ['$http', '$q', function($http, $q) {
    
    this.image = function(imageInput) {
        
         return $http({
            method: 'GET',
            url: 'http://localhost:3000/image?floor_num=' + imageInput
         }).then(function successCallback(response) {
                return (response.data);
            }, function errorCallback(response) {

            });
    }
}])

// CONTROLLERS
DuncanApp.controller('mainController', ['$scope', 'duncanService', function($scope, duncanService){
    
    $scope.searchinput = duncanService.searchinput;
    $scope.search = function () {
        duncanService.search($scope.searchinput);
    };


    $scope.$watch('searchinput', function() {
        
        duncanService.searchinput = $scope.searchinput;
        
    });
}]);


DuncanApp.controller('resultsController', ['$scope', 'duncanService', 'imageService', function($scope, duncanService, imageService){
    
    $scope.searchinput = duncanService.searchinput;
//    console.log($scope.searchinput);
//    $scope.results =  function () {
//        duncanService.search($scope.searchinput);
//    };
    
    $scope.results = {};
    $scope.image = "";

    duncanService.search($scope.searchinput).then(function(response){
        $scope.results = response;
        
        return(response.floor_number);
        
    }).then(function(response) {
        
        return imageService.image(response);
        
    }).then(function(response) {
       
        $scope.image = response;  //adding image link 
        
    });
                                           
//    imageService.image($scope.getImage).then(function(response){
//        $scope.image = {};
//        $scope.image = response;
//    });
    
    imageService
    
    $scope.$watch('searchinput', function() {
        
        duncanService.searchinput = $scope.searchinput;
        
    });

}]);

