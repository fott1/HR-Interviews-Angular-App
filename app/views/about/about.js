
'use strict';

angular.module('myApp.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'views/about/about.html',
    controller: 'aboutCtrl'
  });
}])

//Json Parse
.controller('aboutCtrl', ['$scope', '$http', function($scope, $http){

 //this is a custom feature, i don't really know if it is the best practice, but i struggled to use the json's path
		$http.get(location.protocol + '//' + location.hostname + ':8000/app/views/about/' + 'about.json').success(function(data) {
		$scope.about = data;
		console.log(location.protocol + '//' + location.hostname + ':8000/app/views/about/' + 'about.json');
   });
}])




