angular
.module('blocTimeMikeMedis')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ["$scope", "Tasks"];

function HomeCtrl($scope, Tasks) {
	$scope.allTasks = Tasks.all;

	$scope.addTask = function() {
		$scope.allTasks.$add($scope.newTask);
		$scope.newTask = "";
	};
};
