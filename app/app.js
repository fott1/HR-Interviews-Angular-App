'use strict'; 

angular.module('myApp', [
  'ngRoute',		
  'firebase',		
  'myApp.interviews',
  'myApp.login', 
  'myApp.about',	
  'myApp.contactme',
  'myApp.commments',
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
	.when('/comments', {
		templateUrl: 'views/comments/comments.html',
		controller: 'CommentsCtrl'
	})
  .otherwise({redirectTo: '/'}); //anything unknown to the url goes to /


}]);

