

'use strict';
angular.module('myApp.login', ['ngRoute'])
.controller('LoginCtrl', ['$scope','$http', 'Auth', function ($scope, $http, Auth) {

  $scope.currentPage = 1;
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
  $scope.pageSize = 4;

  Auth.$onAuth(function(authData) {
    $scope.authData = authData;
    if (authData) {
      getRepos();
    }
  });

  // Logs in a user with GitHub
  $scope.login = function() {
    Auth.$authWithOAuthPopup("github").then(function (authData){
      console.log(authData);
    }).catch(function(error) {
      console.error("Error authenticating with GitHub:", error);
    });
  };

  // Logs out the logged-in user
  $scope.logout = function() {
    Auth.$unauth();
  };

  // Retrieves the GitHub repos owned by the logged-in user
  function getRepos() {
    $http.get($scope.authData.github.cachedUserProfile.repos_url, {
      access_token: $scope.authData.github.accessToken
    }).success(function(repos) {
      $scope.repos = repos;
    }).error(function(error) {
      console.error("Error making GitHub API request:", error);
    });
  }

}])
.filter('fromFilter', function(){
return function(data, start){
    return data.slice(start);
}
});
