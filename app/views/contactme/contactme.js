
'use strict';

angular.module('myApp.contactme', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contactme', {
    templateUrl: 'views/contactme/contactme.html',
    controller: 'contactmeCtrl'
  });
}])



.controller('contactmeCtrl', ['$scope', '$firebase', 'interviewsService', function( $scope, $firebase){
  

}])






