angular
.module('blocTimeMikeMedis')
.factory('Tasks', Tasks);

Tasks.$inject = ["$firebaseArray"];

function Tasks($firebaseArray) {
	var firebaseRef = new Firebase ("https://bloctimemikemedis.firebaseio.com/tasks");
	var tasks = $firebaseArray(firebaseRef);

	return {
		all: tasks,
	}
};
