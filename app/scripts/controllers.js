'use strict';

/*jshint unused:false*/
/*jshint asi:true*/



angular.module('AngularSharePointApp')


.controller('MainCtrl', [function () {}])

.controller('TagsCtrl', [function () {}])

.controller('TotalsCtrl', ['$rootScope', '$scope', '$location', 'GuideAPI', function ($rootScope, $scope, $location, GuideAPI) {

	$scope.reqTotal = 0;
	$scope.partTotal = 0;
	$scope.workHourTotal = 0;
	$scope.otherTotal = 0;


	$scope.$on('total', function () {
		if (Object.keys($scope.params).length > 0) {
			GuideAPI.Requisition
			.calculate($rootScope.params)
			.success(function (response) {
				$scope.reqTotal = response.total;
			})

			GuideAPI.Part
			.calculate($rootScope.params)
			.success(function (response) {
				$scope.partTotal = response.total;
			})

			GuideAPI.WorkHour
			.calculate($rootScope.params)
			.success(function (response) {
				$scope.workHourTotal = response.total;
			})

			GuideAPI.Other
			.calculate($rootScope.params)
			.success(function (response) {
				$scope.otherTotal = response.total;
			})
		} else {
			$scope.reqTotal = 0;
			$scope.partTotal = 0;
			$scope.workHourTotal = 0;
			$scope.otherTotal = 0;
		}
	})

	$scope.$on('clear', function () {
		$scope.reqTotal = 0;
		$scope.partTotal = 0;
		$scope.workHourTotal = 0;
		$scope.otherTotal = 0;
	});

	$scope.sendSearch = function (path) {
		$location.path(path);			
		window.setTimeout(function () {
			$rootScope.$broadcast('search');
		}, 100);
	};

	$scope.total = function () {
		return $scope.reqTotal + $scope.partTotal + $scope.workHourTotal + $scope.otherTotal;
	};

}])


.controller('SearchCtrl', ['GuideAPI', '$scope', '$rootScope', function (GuideAPI, $scope, $rootScope) {

	$rootScope.params = {};
	$rootScope.tagsParams = {};

	$scope.searchRequest = function () {
		$rootScope.tagsParams = {};
		for(var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				$rootScope.tagsParams[p] = $rootScope.params[p];
			}
		}

		// $rootScope.tagsParams = $rootScope.params;
		$rootScope.$broadcast('search');
		$rootScope.$broadcast('total');
	};

	$scope.resetParam = function (param) {
		delete $rootScope.params[param];
		$scope.searchRequest();
	};

	$scope.resetParams = function () {
		$rootScope.params = {};
		$rootScope.tagsParams = {};
		$rootScope.$broadcast('clear');
	};

}])



.controller('RequisitionCtrl', ['$rootScope', 'GuideAPI', '$scope', function ($rootScope, GuideAPI, $scope) {

	$scope.items = [];

	$scope.search = function () {
		if (!$rootScope.params || $rootScope.params === 'undefined') {
			$scope.clear();
			return false;
		}
		for(var prop in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(prop)) {
				if ($rootScope.params[prop] === '') {
					delete $rootScope.params[prop];
				}
			}
		}
		$rootScope.tagsParams = {};
		for(var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				$rootScope.tagsParams[p] = $rootScope.params[p];
			}
		}

		if (Object.keys($scope.params).length < 1) {
			$scope.clear();
			return false;
		}
		
		$rootScope.$broadcast('total');

		GuideAPI.Requisition
		.search($rootScope.params)
		.success(function (founds) {
			$scope.items = founds;
		})
		.error(function (err) {
			console.log(err);
		})	
	};

	$scope.clear = function () {
		$rootScope.params = {};
		$rootScope.tagsParams = {};
		$scope.items = [];
	}


	$scope.$on('search', $scope.search);
	$scope.$on('clear', $scope.clear);


}])










.controller('PartCtrl', ['$rootScope', 'GuideAPI', '$scope', function ($rootScope, GuideAPI, $scope) {

	$scope.items = [];

	$scope.search = function () {
		if (!$rootScope.params || $rootScope.params === 'undefined') {
			$scope.clear();
			return false;
		}
		for(var prop in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(prop)) {
				if ($rootScope.params[prop] === '') {
					delete $rootScope.params[prop];
				}
			}
		}
		$rootScope.tagsParams = {};
		for(var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				$rootScope.tagsParams[p] = $rootScope.params[p];
			}
		}

		if (Object.keys($scope.params).length < 1) {
			$scope.clear();
			return false;
		}
		
		$rootScope.$broadcast('total');

		GuideAPI.Part
		.search($rootScope.params)
		.success(function (founds) {
			$scope.items = founds;
		})
		.error(function (err) {
			console.log(err);
		})	
	};


	$scope.clear = function () {
		$rootScope.params = {};
		$rootScope.tagsParams = {};
		$scope.items = [];
	}


	$scope.$on('search', $scope.search);
	$scope.$on('clear', $scope.clear);


}])






.controller('OtherCtrl', ['$rootScope', 'GuideAPI', '$scope', function ($rootScope, GuideAPI, $scope) {

	$scope.items = [];

	$scope.search = function () {
		if (!$rootScope.params || $rootScope.params === 'undefined') {
			$scope.clear();
			return false;
		}
		for(var prop in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(prop)) {
				if ($rootScope.params[prop] === '') {
					delete $rootScope.params[prop];
				}
			}
		}
		$rootScope.tagsParams = {};
		for(var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				$rootScope.tagsParams[p] = $rootScope.params[p];
			}
		}

		if (Object.keys($scope.params).length < 1) {
			$scope.clear();
			return false;
		}
		
		$rootScope.$broadcast('total');

		GuideAPI.Other
		.search($rootScope.params)
		.success(function (founds) {
			$scope.items = founds;
		})
		.error(function (err) {
			console.log(err);
		})	
	};


	$scope.clear = function () {
		$rootScope.params = {};
		$rootScope.tagsParams = {};
		$scope.items = [];
	}


	$scope.$on('search', $scope.search);
	$scope.$on('clear', $scope.clear);


}])







.controller('MOCtrl', ['$rootScope', 'GuideAPI', '$scope', function ($rootScope, GuideAPI, $scope) {

	$scope.items = [];

	$scope.search = function () {
		if (!$rootScope.params || $rootScope.params === 'undefined') {
			$scope.clear();
			return false;
		}
		for(var prop in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(prop)) {
				if ($rootScope.params[prop] === '') {
					delete $rootScope.params[prop];
				}
			}
		}
		$rootScope.tagsParams = {};
		for(var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				$rootScope.tagsParams[p] = $rootScope.params[p];
			}
		}

		if (Object.keys($scope.params).length < 1) {
			$scope.clear();
			return false;
		}
		
		$rootScope.$broadcast('total');

		GuideAPI.WorkHour
		.search($rootScope.params)
		.success(function (founds) {
			$scope.items = founds;
		})
		.error(function (err) {
			console.log(err);
		})	
	};


	$scope.clear = function () {
		$rootScope.params = {};
		$rootScope.tagsParams = {};
		$scope.items = [];
	}


	$scope.$on('search', $scope.search);
	$scope.$on('clear', $scope.clear);


}])











