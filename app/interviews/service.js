
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

        var totalComments = function(){
            var deferred = $q.defer();
            var interviews = getData();
            var totalComments = 0;
            interviews.$loaded().then(function(interviews) { //promise to get first the data and then count the length
              var log = [];
              angular.forEach(interviews, function(value, key) {
                if(value.comment == true){
                    totalComments++;
                  }
              }, log);
              deferred.resolve(totalComments);
            });
            return deferred.promise;
        }
        
        var service = {
            getData: getData,  
            showFalse : showFalse,
            showTrue : showTrue,
            totalComments : totalComments
        };
        return service; 
	}
	])
.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://hr-interviews.firebaseIO.com");
  return $firebaseAuth(ref);
});