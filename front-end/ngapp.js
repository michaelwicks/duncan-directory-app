var DuncanApp = angular.module('DuncanApp', ['ngRoute', 'ngResource']);

DuncanApp.config(function ($routeProvider) {
    $routeProvider
    
    .when ('/', {
        
        templateUrl: 'main.html',
        controller: 'mainController'
    })
    
    .when ('/results.html', {
        
        templateUrl: 'results.html',
        controller: 'resultsController'
    })
    
    .when ('/images.html', {
        templateUrl: 'images.html',
        controller: 'resultsController'
    })
});


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
                console.log(response.data);
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
    
    $scope.$watch('searchinput', function() {
        
        duncanService.searchinput = $scope.searchinput;
        
    });

}]);

