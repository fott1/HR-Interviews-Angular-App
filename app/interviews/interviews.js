
'use strict';
angular.module('myApp.interviews', ['ngRoute', 'ngAnimate', 'atomic-notify', 'ngAnimate', 'ui.bootstrap'])

.config(['$routeProvider', 'atomicNotifyProvider', function($routeProvider, atomicNotifyProvider) {
    atomicNotifyProvider.setDefaultDelay(5000);
    atomicNotifyProvider.useIconOnNotification(true);
}])
//Inject the dependencies in our Controller and ready to go. The known Angular DI...
.controller('InterviewsCtrl', ['$scope', '$firebaseArray', 'interviewsService', 'atomicNotifyService', '$q', function($scope, $firebaseArray, interviewsService, atomicNotifyService, $q) {

    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
    $scope.pageSize = 4;

    $scope.successmessage = function(){
        atomicNotifyService.success('Yeah!, this works as expected!');
    };

      $scope.interviews = interviewsService.getData()

// Prepei na valo to filter ayto wste na deixnei to pagination pio swsta. to service exei to logic

      // var totalComments = interviewsService.totalComments();

      // totalComments.then(function(){
      //   $scope.interviewsFilter = $scope.interviews.length - totalComments.$$state.value
      //   console.log('Total Data are: ' + $scope.interviews.length)
      //   console.log('Total Comments are: ' + totalComments.$$state.value)
      //   console.log('Total Interviews are: ' + $scope.interviewsFilter)
      // });

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

  $scope.addInterview = function (){ //same stuff here
    $scope.interviews.$add({ //add method to add interview. Again Add method is given in the object by default
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      position: $scope.position,
      date: $scope.date,
      like: 0, // to use it later at comments section
      comment: false, // i use it to categorise which add is comment or interview
    }).then(function(ref){ //This is a promise! passing the ref with all data. 
      var id = ref.key();
      console.log('Interview added....'+ id); //just to see if its working i check console
      $scope.firstname = ""; //now empty the inputs
      $scope.lastname = "";
      $scope.position = "";
      $scope.date = "";
    });  
  }

  $scope.totalComments = function (){
      var sumOfComments = $scope.interviews.length;
      console.log(sumOfComments)
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
      $scope.firstname = ""; 
      $scope.lastname = "";
      $scope.position = "";
      $scope.date = "";
      console.log(ref.key)
    });
  }

  $scope.removeInterview = function (interview){
    bootbox.confirm("Are you sure?", function(result) {
      if(result == true){
        console.log('in')
          $scope.interviews.$remove(interview);
          $scope.firstname = "";
          $scope.lastname = "";
          $scope.position = "";
          $scope.date = "";
          bootbox.alert("Candidate Deleted.")
          }
      
          });
    }
}])
.filter('startFrom', function(){
return function(data, start){
    return data.slice(start);
}
});



