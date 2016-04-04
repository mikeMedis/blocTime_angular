
var twoFiveWorkTime = 1500;
var fiveTwoWorkTime = 3120;
var fiveMinBreak = 300;
var oneSevenMinBreak = 1020;


var blocTimeMikeMedis = angular.module('blocTimeMikeMedis', ['firebase', 'ui.router']);

blocTimeMikeMedis.config(function($stateProvider, $urlRouterProvider, $locationProvider){

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('home', {
		url: '/home',
		controller: 'homeController',
		templateUrl: '/templates/home.html'
	});
});

blocTimeMikeMedis.controller('homeController', [
	'$scope',
	'$firebaseArray',
	'$firebaseObject',
	'$interval',
	function($scope, $firebaseArray, $firebaseObject, $interval) {
		var ref = new Firebase ("https://bloctimemikemedis.firebaseio.com/users");
		$scope.data = $firebaseObject(ref);

			var users = $firebaseArray(ref);
			users.$add({"Mike":"Medis"});
	}
]);

blocTimeMikeMedis.controller('timeController', [
	"$scope",
	'$interval',
	function($scope, $interval) {
		$scope.isTimeRunning = false;
		$scope.breakTime = false;
		$scope.counter = 1500;
		var projects = 0;
		var startProject;

		$scope.startTime = function () {
			$scope.isTimeRunning = true;

			if (!$scope.counter) {
				$scope.counter = twoFiveWorkTime;
			}

			startProject = $interval(function() {
				$scope.counter--;
				if ($scope.counter == 0) {
					$interval.cancel(startProject);
					$scope.isTimeRunning = false;

					if (!$scope.breakTime) {
						projects++;
						$scope.breakTime = true;

						if ($scope.counter = fiveTwoWorkTime) {
							$scope.counter = fiveMinBreak;
							$scope.isTimeRunning = false;
						} else {
							$scope.counter = fiveMinBreak;
							$scope.isTimeRunning = false;
						}
					} else {
						$scope.breakTime = false;
						$scope.counter = twoFiveWorkTime;
					}
				}
			}, 1000);
		};

		$scope.resetTime = function() {
			$interval.cancel(startProject);
			$scope.counter = twoFiveWorkTime;
			$scope.isTimeRunning = false;
		}
	}
]);

blocTimeMikeMedis.filter('timeCode', function(){
	return function(seconds) {
		seconds = Number.parseFloat(seconds);
		var wholeSeconds = Math.floor(seconds);
		var minutes = Math.floor(wholeSeconds / 60);

		remainingSeconds = wholeSeconds % 60;

		var output = minutes + ':';

		if(remainingSeconds < 10) {
			output += '0';
		}
		output += remainingSeconds;
		return output;
	}
});
