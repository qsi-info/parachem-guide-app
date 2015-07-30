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
		templateUrl: 'views/main.html',
	})

})




.controller('MainCtrl', function ($scope, GuideAPI) {

	$scope.searchParams = [];
	$scope.params = {};
	$scope.reports = [];
	$scope.sortType = '';

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
			window.alert('Vous devez entrer au moins un paramètre de recherche');
			$scope.resetParams();
			// if (window.confirm('Êtes-vous certain de vouloir faire une requête sans paramètre de recherche')) {
			// 	GuideAPI.all().success(function (reports) {
			// 		$scope.reports = reports
			// 	})
			// }
		} else {
			GuideAPI.search($scope.params).success(function (reports) {
				$scope.reports = reports
				$scope.searchParams = $scope.params;
			})			
		}
	};


	$scope.resetParams = function () {
		$scope.params = {};
		$scope.searchParams = [];
		$scope.reports = [];
		$scope.sortType = '';
	};


	$scope.total = function () {
		var total = 0;
		$scope.reports.forEach(function (r) {
			total += r.Price
		});
		return total;
	};

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





