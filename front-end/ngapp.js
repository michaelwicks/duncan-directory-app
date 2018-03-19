// MODULE
var DuncanApp = angular.module('DuncanApp', ['ngRoute', 'ngResource', 'ngParse', 'angularMoment']); 

//ROUTES
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
    
    .when ('/successful.html', {
        
        templateUrl: 'successful.html',
        controller: 'parseResultsController'
    })
});
       
// Linking Parse Database
DuncanApp.config(['ParseProvider', function ($ParseProvider){
    var MY_PARSE_APP_ID = 'dMTmXzxnwbeMe9iyK4vivUqoCdQSq5XJGf3LGHOq';
    var MY_PARSE_JS_KEY = 'kAMpM6libZXYPBNa6gl20X09BiqjURQhUrsKoSlX';
    $ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
    $ParseProvider.serverURL = 'https://parseapi.back4app.com/';
}]);

// RESULTS CONTROLLER 

DuncanApp.controller('parseResultsController', ['$scope', 'Parse', 'duncanService', 'moment', '$filter', function($scope, Parse, duncanService, moment, $filter){
    
    // PARSE QUERY to get data
    var Keyword = Parse.Object.extend("Keyword")
    var query = new Parse.Query(Keyword) // Targets "Keyword" class in Parse 
    
    // Including pointers 
    query.include("hours") 
    query.include("floorImage")
    
    // keyword has to be equal to inputted keyword by the user
    query.equalTo("keyword", duncanService.searchInput);
    
    query.first().then(function(result){
        
        // Converting Parse objects to readable angular objects
        Parse.defineAttributes(result, ['keyword', 'roomNumber', 'floorNumber', 'hours', 'floorImage']);
        Parse.defineAttributes(result.hours, ['startTime', 'endTime']);
        Parse.defineAttributes(result.floorImage, ['floorImage']);
        
        //Calls Moment - Time library 
        $scope.startTime = moment(result.hours.startTime).add(5, 'hours').format('LTS'); // $scope - accessible on the view 
        $scope.endTime = moment(result.hours.endTime).add(5, 'hours').format('LTS'); // $scope - accessible on the view
        
        $scope.result = result; // Makes results accessible on the view 
        result.keyword = duncanService.searchInput;
        
    });
    
// Function takes user input name and email and saves it to PARSE 
    
   $scope.userInput = 
       
       function userInput() {
   
    var userData = new Parse.Object('Email') // Targets "Email" class in Parse
    Parse.defineAttributes(userData, ['name', 'email', 'keywordString']) 
    userData.name = $filter('lowercase')($scope.userName); // Makes user inputted name lowercase before saving to Parse 
    userData.email = $scope.userEmail; 
    userData.keywordString = duncanService.searchInput; // User input into search box  == keyword stored in parse
    
    userData.save(null, {
        
        success: function(userData) { 
        },
        
        error: function(userData, error) {
        }
        
    }); 
    }
    
}]);

// DUNCAN SERVICE 
DuncanApp.service('duncanService', [ function() {
    
    this.searchInput = '';
    
}]);

// MAIN CONTROLLER 
DuncanApp.controller('mainController', ['$scope', 'duncanService', '$filter', function($scope, duncanService, $filter){
    
    // Makes SearchInput no longer case sensitive 
    $scope.$watch('searchInput', function() {  
        duncanService.searchInput = $filter('lowercase')($scope.searchInput);
    });

}]);