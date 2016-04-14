angular
.module('blocTimeMikeMedis')
.factory('Tasks', Tasks);

Tasks.$inject = ["$firebaseArray"];

function Tasks($firebaseArray) {
	var firebaseRef = new Firebase ("https://bloctimemikemedis.firebaseio.com/tasks");
	var tasks = $firebaseArray(firebaseRef);

	function deleteTasks() {
			firebaseRef.remove();
	};

	return {
		all: tasks,
		deleteTasks: deleteTasks
	}
};
