var blocTimeMikeMedis = angular.module('blocTimeMikeMedis', ['firebase', 'ui.router']);

blocTimeMikeMedis.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise("/home");

	$stateProvider
	.state('home', {
		url: '/home',
		controller: 'homeController',
		templateUrl: '/templates/home.html',
	});
});

blocTimeMikeMedis.controller('homeController', [
	'$scope',
	'$firebaseArray',
	'$firebaseObject',
	'$interval',
	function ($scope, $firebaseArray, $firebaseObject, $interval) {
		var ref = new Firebase ("https://bloctimemikemedis.firebaseio.com/");
		$scope.data = $firebaseObject(ref);

		var a = $firebaseArray(ref);
		a.$add({"asdf":"asdfasdf"});
	}
]);

blocTimeMikeMedis.controller('timeController', [
	'$scope',
	'$interval',
	function ($scope, $interval) {
		$scope.counter = 1500;
		var stop;
		var isTimeRunning = false;

		$scope.startTime = function () {
			this.isTimeRunning = true;
			stop = $interval(function(){
				$scope.counter--;
				if($scope.counter == 0) {
					$interval.cancel(stop);
					$scope.counter = 1500;
				}
			}, 1000);
		};

		$scope.stopAndReset = function () {
			$interval.cancel(stop);
			$scope.counter = 1500;
			this.isTimeRunning = false;
		}
	}
]);

blocTimeMikeMedis.filter('timeCode', function() {
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
