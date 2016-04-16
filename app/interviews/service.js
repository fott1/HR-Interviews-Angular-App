
'use strict'; 
angular.module('myApp.interviews')
.factory('interviewsService', ['$firebase','$firebaseArray','$q', function($firebase, $firebaseArray, $q) {

		var ref = new Firebase('hr-interviews.firebaseIO.com');
        var getData = function(callback){
            return $firebaseArray(ref);
        };

        var showFalse = function(){
        	return false;
        };

        var showTrue = function(){
        	return true;
        };

        var service = {
            getData: getData,  
            showFalse : showFalse,
            showTrue : showTrue
        };
        return service; 
	}
	])
.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://hr-interviews.firebaseIO.com");
  return $firebaseAuth(ref);
});