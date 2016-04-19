
'use strict';

angular.module('myApp.commments', ['ngRoute', 'firebase'])

.controller('CommentsCtrl', ['$firebaseArray', '$scope', '$firebase', 'interviewsService', 'Auth', function($firebaseArray, $scope, $firebase, interviewsService, Auth){
  
	var ref = new Firebase("https://hr-interviews.firebaseIO.com");
	var messages = $firebaseArray(ref);
	$scope.addMessage = function(){
		messages.$add({
			comment: true,
			name: $scope.name,
			email: 'disabled',
			like: 0,
			message: $scope.message
		})
		.then(function(ref){
			var id = ref.key();
			  console.log("added record with id " + id);
			  messages.$indexFor(id); // returns location in the array
			});
		$scope.messages = messages; // make the msgs available to the DOM
			$scope.name = "",
			$scope.email = "",
			$scope.message = ""
	}
	$scope.messages = messages;
	$scope.isDisabled = false;
	$scope.likeCounter = function(msg){ //same here
		$scope.like = msg.like + 1;
		var id = msg.$id;
		var record = $scope.messages.$getRecord(id);
		record.like = $scope.like;
	$scope.messages.$save(record).then(function(ref){
		console.log("+1 Like for " + msg.name + "! Now, " + msg.like + " in total!");
		$scope.isDisabled = true;
		});
	}

}])






