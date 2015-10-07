'use strict';

/*jshint unused:false*/
/*jshint asi:true*/
/* global $:true */



angular.module('AngularSharePointApp')


.controller('MainCtrl', [function () {}])

.controller('TagsCtrl', [function () {}])

.controller('TotalsCtrl', ['$rootScope', '$scope', '$location', 'GuideAPI', function ($rootScope, $scope, $location, GuideAPI) {

	$scope.reqTotal = 0;
	$scope.partTotal = 0;
	$scope.workHourTotal = 0;
	$scope.otherTotal = 0;
	$scope.nbHours = 0;


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
				$scope.nbHours = parseInt(response.hours);
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
			$scope.nbHours = 0;
		}
	})

	// $scope.$on('hours', function (event, data) {
	// 	$scope.nbHours = data.nbHours;
	// });

	$scope.$on('clear', function () {
		$scope.reqTotal = 0;
		$scope.partTotal = 0;
		$scope.workHourTotal = 0;
		$scope.otherTotal = 0;
		$scope.nbHours = 0;
	});

	$scope.sendSearch = function (path) {
		$location.path(path);			
		window.setTimeout(function () {
			$rootScope.$broadcast('search');
		}, 500);
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



.controller('RequisitionCtrl', ['$rootScope', 'GuideAPI', '$scope', 'Utils', function ($rootScope, GuideAPI, $scope, Utils) {

	$scope.items = [];

	$rootScope.report = 'GuideRequisitions';

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



	$scope.print = function () {
		var query = '';
		for (var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				query += '&' + p + '=' + $rootScope.params[p];
			}
		}
		Utils.popupWindow('http://paradevsrv02/ReportServer?/GuideReporter&rs:Command=Render&rc:Toolbar=true&Project=0150025&Requisition=26730', 1000, 600)
	}

	$scope.$on('search', $scope.search);
	$scope.$on('clear', $scope.clear);


}])










.controller('PartCtrl', ['$rootScope', 'GuideAPI', '$scope', function ($rootScope, GuideAPI, $scope) {

	$scope.items = [];

	$rootScope.report = 'GuideParts';

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

	$rootScope.report = 'GuideOthers';

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

	$rootScope.report = 'GuideMO';

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
			// var nbHours = 0;
			// founds.forEach(function (f) {
			// 	nbHours += f.NbHour;
			// })
			// $rootScope.$broadcast('hours', { nbHours: nbHours })
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











