'use strict'; //for throwing less errors

angular.module('myApp', [
  'ngRoute',		
  'firebase',		
  'myApp.interviews', 
  'myApp.about',	
  'myApp.contactme',
  'ngMaterial',
  'ngAnimate',
  'atomic-notify'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'}); //anything unknown to the url goes to /interviews
}]);

