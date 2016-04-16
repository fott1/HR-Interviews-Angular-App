
'use strict';

angular.module('myApp.contactme', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contactme', {
    templateUrl: 'views/contactme/contactme.html',
    controller: 'contactmeCtrl'
  });
}])

.controller('contactmeCtrl', ['$scope', function($scope){
	
}])