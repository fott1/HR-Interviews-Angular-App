'use strict'; 

angular.module('myApp', [
  'ngRoute',		
  'firebase',		
  'myApp.interviews',
  'myApp.login', 
  'myApp.about',	
  'myApp.contactme',
  'ngMaterial',
  'ngAnimate',
  'atomic-notify'
]).
config(['$routeProvider', function($routeProvider) {

	$routeProvider
	.when('/profile', {
		templateUrl: 'views/profile/profile.html',
		controller: 'LoginCtrl'
	})
	.when('/', {
		templateUrl: 'interviews/interviews.html'
	})
  .otherwise({redirectTo: '/'}); //anything unknown to the url goes to /


}]);

