var DuncanApp = angular.module('DuncanApp', ['ngRoute', 'ngResource','ngParse', 'angularMoment']);

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
        controller: 'parseImageController'
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
DuncanApp.controller('parseResultsController', ['$scope', 'Parse', 'duncanService', function($scope, Parse, duncanService){
    $scope.result = {}; 
    var Keyword = Parse.Object.extend("Keyword")
    var query = new Parse.Query(Keyword)
    query.include("hours")
    console.log(duncanService.searchInput);
    query.equalTo("keyword", duncanService.searchInput );
    query.first().then(function(result){
        console.log(result);
        Parse.defineAttributes(result, ['keyword', 'roomNumber', 'floorNumber', 'hours'])
        Parse.defineAttributes(result.hours, ['startTime', 'endTime'])
        $scope.result = result;
//        return result;
    });
    }]);
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


// SERVICES
DuncanApp.service('duncanService', ['$http', '$q', function($http, $q) {
    this.searchInput = '';
    
//
//    this.search = function(searchInput){
//        return $http({
//            method: 'GET',
//            url: 'http://localhost:3000/search?keyword=' + searchInput
//         }).then(function successCallback(response) {
//                console.log(response.data);
//                return (response.data);
//            }, function errorCallback(response) {
//
//            });
//    }
//
//    
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
    
//    $scope.search = function () {
//        duncanService.search($scope.searchInput);
//    };


    $scope.$watch('searchInput', function() {
        console.log($scope.searchInput);        
        duncanService.searchInput = $scope.searchInput;
        
    });
}]);


//DuncanApp.controller('resultsController', ['$scope', 'duncanService', 'imageService', function($scope, duncanService, imageService){
//    
//    $scope.searchInput = duncanService.searchInput;
////    console.log($scope.searchInput);
////    $scope.results =  function () {
////        duncanService.search($scope.searchInput);
////    };
//    
//    $scope.results = {};
//    $scope.image = "";
//
//    duncanService.search($scope.searchInput).then(function(response){
//        $scope.results = response;
//        
//        return(response.floor_number);
//        
//    }).then(function(response) {
//        
//        return imageService.image(response);
//        
//    }).then(function(response) {
//       
//        $scope.image = response;  //adding image link 
//        
//    });
//                                           
////    imageService.image($scope.getImage).then(function(response){
////        $scope.image = {};
////        $scope.image = response;
////    });
//    
//    imageService
//    
//    $scope.$watch('searchInput', function() {
//        
//        duncanService.searchInput = $scope.searchInput;
//        
//    });
//
//}]);

