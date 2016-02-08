(function() {
	var app = angular.module('eStore', ['firebase']);

	app.controller('InventoryController', function($scope, $firebaseObject) {
		var ref = new Firebase('https://blinding-heat-3195.firebaseio.com/menu');
		var syncObject = $firebaseObject(ref);
		syncObject.$bindTo($scope, "data");

		$scope.current = false;
		$scope.setCurrent = function(itemName) {
			$scope.current = itemName;
		};
		$scope.isSet = function(itemName) {
			return $scope.current === itemName;
		};
		$scope.range = function(num) {
			var range = [];
			num = parseInt(num);
			for(i = 1; i <= num; i++) {
				range.push(i);
			}
			return range;
		};
	});
})();