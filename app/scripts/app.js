'use strict';

/**
 * @ngdoc overview
 * @name AngularSharePointApp
 * @description
 * # AngularSharePointApp
 *
 * Main module of the application.
 */

 /*jshint unused:false*/
 /*jshint asi:true*/



angular.module('AngularSharePointApp', ['ngSharePoint', 'ngRoute', 'angular-loading-bar', 'sticky'])


.config(function ($routeProvider) {

	$routeProvider


	.when('/', {
		controller: 'MainCtrl',
		templateUrl: 'views/guide.html',
	})

})


// .run(function ($rootScope) {
// 	$rootScope.theme = 'new';
// 	var linkElem = document.createElement('link');
// 	document.getElementsByTagName('head')[0].appendChild(linkElem);
// 	linkElem.rel = 'stylesheet';
// 	linkElem.type = 'text/css';
// 	linkElem.href = 'styles/theme.css';


// 	$rootScope.changeTheme = function (theme) {
// 		if (theme === 'old') {
// 			linkElem = document.createElement('link');
// 			document.getElementsByTagName('head')[0].appendChild(linkElem);
// 			linkElem.rel = 'stylesheet';
// 			linkElem.type = 'text/css';
// 			linkElem.href = 'styles/386-theme.css';
// 			$rootScope.theme = 'old';

// 		} 
// 		if (theme === 'new') {
// 			window.location.reload();
// 			// linkElem = document.createElement('link');
// 			// document.getElementsByTagName('head')[0].appendChild(linkElem);
// 			// linkElem.rel = 'stylesheet';
// 			// linkElem.type = 'text/css';
// 			// linkElem.href = 'styles/theme.css';			
// 			// $rootScope.theme = 'new';
// 		}
// 	}

// })




.controller('MainCtrl', function ($scope, GuideAPI, $http) {

	$scope.searchParams = [];
	$scope.params = {};
	$scope.reports = [];
	$scope.sortType = '';
	$scope.partTotal = 0;
	$scope.workHourTotal = 0;
	$scope.otherTotal = 0;
	$scope.reqTotal = 0;

	$scope.searchRequest = function () {
		if ($scope.params.PurchaseOrder === '') {
			delete $scope.params.PurchaseOrder;
		}

		if ($scope.params.Project === '') {
			delete $scope.params.Project;
		}

		if ($scope.params.Requisition === '') {
			delete $scope.params.Requisition;
		}

		if ($scope.params.WorkOrder === '') {
			delete $scope.params.WorkOrder;
		}

		if ($scope.params.Company === '') {
			delete $scope.params.Company;
		}

		if ($scope.params.AccountingCode === '') {
			delete $scope.params.AccountingCode;
		}


		if (Object.keys($scope.params).length < 1) {
			// window.alert('Vous devez entrer au moins un paramètre de recherche');
			$scope.resetParams();


		} else if ($scope.params.Company && $scope.params.Company.length < 3) {
			window.alert('Le nom de compagnie doit au moins avoir trois charactères');
		} else {
			GuideAPI.search($scope.params).success(function (reports) {
				$scope.reports = reports
				$scope.searchParams = {};
				for(var p in $scope.params) {
					if ($scope.params.hasOwnProperty(p)) {
						$scope.searchParams[p] = $scope.params[p];
					}
				}
			});


			$http.post('http://parasrv12.parachem.ca:8002/part/calculate', $scope.params).success(function (r) {
				$scope.partTotal = r.total;
			})

			$http.post('http://parasrv12.parachem.ca:8002/other/calculate', $scope.params).success(function (r) {
				$scope.otherTotal = r.total;
			})

			$http.post('http://parasrv12.parachem.ca:8002/workhour/calculate', $scope.params).success(function (r) {
				$scope.workHourTotal = r.total;
			})



		}
	};


	$scope.resetParams = function () {
		$scope.params = {};
		$scope.searchParams = {};
		$scope.reports = [];
		$scope.sortType = '';
		$scope.reqTotal = 0;
		$scope.workHourTotal = 0;
		$scope.partTotal = 0;
		$scope.otherTotal = 0;
	};


	$scope.total = function () {
		var total = 0;
		$scope.reports.forEach(function (r) {
			total += r.Price
		});
		$scope.reqTotal = total;
		return total;
	};

	$scope.bigTotal = function () {
		var total = 0;
		total += $scope.reqTotal + $scope.workHourTotal + $scope.partTotal + $scope.otherTotal;
		return total;
	};

	$scope.resetParam = function (param) {
		$scope.params[param] = '';
		$scope.searchRequest();
	}

})










.factory('GuideAPI', function ($http) {

	// var server = 'http://localhost:1337';
	var server = 'http://parasrv12.parachem.ca:8002';

	var service = {};


	service.all = function () {
		return $http.get(server + '/report/all');
	};


	service.search = function (params) {
		if (typeof params === 'undefined') {
			params = {};
		}
		return $http.post(server + '/report/search', params);
	};



	return service;

})


/* jshint ignore:start */


Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };


/* jshint ignore:end */





