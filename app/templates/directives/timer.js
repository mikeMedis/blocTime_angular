(function() {
	function timer($interval, TIMER_STATES) {

		return {
			templateUrl: '/templates/directives/timer.html',
			replace: true,
			restrict: 'E',
			scope: { },
			link: function(scope, element, attributes) {

				scope.time = TIMER_STATES.WORK_TIME;

				var timer = null;

				var completedWorkSessions = 0;

				var mySound = new buzz.sound("assets/sounds/ding.mp3", {
					preload: true
				});

				scope.buttonText = function() {
					if(timer === null){
						return "Start";
					} else {
						return "Stop";
					}
				}

				scope.toggleTimer = function() {
					if (timer === null) {
						updateTime();
						timer = $interval(updateTime, 1000);
					} else {
						$interval.cancel(timer);
						timer = null;
						resetTimer();
					}
				}

				scope.onBreak = false;

				scope.$watch('onBreak', function(current, prev) {
					if(prev != null && prev !== current){
						mySound.play();
					}
				}, true);



				var updateTime = function() {
					scope.time -= 1;
					if (scope.time === 0){
						changeBreakStatus();
						if(scope.onBreak) {
							completedWorkSessions += 1;
						}
						scope.toggleTimer();
					}
				};

				var changeBreakStatus = function() {
					scope.onBreak = !(scope.onBreak);
				};

				var resetTimer = function() {
					if(scope.onBreak){
						if (completedWorkSessions === 4){
							scope.time = TIMER_STATES.LONG_BREAK_TIME;
							completedWorkSessions = 0;
						} else{
							scope.time = TIMER_STATES.BREAK_TIME;
						}
					}else{
						scope.time = TIMER_STATES.WORK_TIME;
					}
				};
			}
		};
	}

	angular
	.module('bloctime')
	.constant('TIMER_STATES', {
		"BREAK_TIME": 300,
		"WORK_TIME": 1500,
		"LONG_BREAK_TIME": 1800
	})
	.directive('timer', ['$interval', 'TIMER_STATES', timer]);
})();
