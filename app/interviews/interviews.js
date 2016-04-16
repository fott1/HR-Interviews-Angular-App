
'use strict';
//Interviews Module where the main work is done, comments will follow for George to understand my logic
angular.module('myApp.interviews', ['ngRoute', 'ngAnimate', 'atomic-notify', 'ngAnimate', 'ui.bootstrap'])
//Route configuration. When the url is '/', render interviews.html and use the interviews controller
.config(['$routeProvider', 'atomicNotifyProvider', function($routeProvider, atomicNotifyProvider) {
  $routeProvider.when('/', {
    templateUrl: 'interviews/interviews.html',
    controller: 'InterviewsCtrl'
  });
    atomicNotifyProvider.setDefaultDelay(5000);
    atomicNotifyProvider.useIconOnNotification(true);
}])
//Inject the dependencies in our Controller and ready to go. The known Angular DI...
.controller('InterviewsCtrl', ['$scope', '$firebaseArray', 'interviewsService', 'atomicNotifyService', function($scope, $firebaseArray, interviewsService, atomicNotifyService) {

    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
    $scope.pageSize = 4;

    $scope.successmessage = function(){
        atomicNotifyService.success('Yeah!, this works as expected!');
    };

    $scope.interviews= interviewsService.getData();
    $scope.orderByField = 'lastName'; //This is used for sorting with <a>Lastname</a>
    $scope.reverseSort = interviewsService.showFalse();
    //initial values to show or not add and edit forms
    $scope.addFormShow = interviewsService.showTrue();
    $scope.editFormShow = interviewsService.showFalse();
    //The values are changed now. We attached this function to ng-submit in the html files 
  $scope.showEditForm = function (interview){ //we pass the interview
    $scope.addFormShow = interviewsService.showFalse(); //change here
    $scope.editFormShow = interviewsService.showTrue();; //change here
    $scope.id = interview.$id; // which interview to show? get the id for that... ID is built-in the object...
    $scope.firstname = interview.firstname; //what the uses inputs, changes in the interview
    $scope.lastname = interview.lastname;
    $scope.position = interview.position;
    $scope.date = interview.date;
    }

  $scope.addInterview= function (){ //same stuff here
    $scope.interviews.$add({ //add method to add interview. Again Add method is given in the object by default
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      position: $scope.position,
      date: $scope.date,
    }).then(function(ref){ //This is a promise! passing the ref with all data. 
      var id = ref.key();
      console.log('Interview added....'+ id); //just to see if its working i check console
      $scope.firstname = ""; //now empty the inputs, instead of manually removing text. I really dont know if its the best practice
      $scope.lastname = "";
      $scope.position = "";
      $scope.date = "";
    });  
  }

  $scope.editInterview = function(){ //same here
    var id = $scope.id;
    var record = $scope.interviews.$getRecord(id);
    record.firstname = $scope.firstname;
    record.lastname = $scope.lastname;
    record.position = $scope.position;
    record.date = $scope.date;
    //Save 
    $scope.interviews.$save(record).then(function(ref){
      $scope.firstname = ""; //now empty the inputs, instead of manually removing text. I really dont know if its the best practice
      $scope.lastname = "";
      $scope.position = "";
      $scope.date = "";
      console.log(ref.key)
    });
  }

  $scope.removeInterview = function (interview){ //same here
    bootbox.confirm("Are you sure?", function(confirmed) {
      if(confirmed == true){
          $scope.interviews.$remove(interview);
          $scope.firstname = "";
          $scope.lastname = "";
          $scope.position = "";
          $scope.date = "";
          }
      bootbox.alert("Candidate Deleted.")
          });
    }
}])

.filter('startFrom', function(){
return function(data, start){
    return data.slice(start);
}
})

.controller('LoginCtrl', ['$scope','$http', 'Auth', function ($scope, $http, Auth) {

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

}]);


