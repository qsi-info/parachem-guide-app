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



angular.module('AngularSharePointApp', [
	'ngSharePoint', 
	'ngRoute', 
	'angular-loading-bar', 
	'sticky'
])


.config(function ($routeProvider) {

	$routeProvider

	.when('/', { redirectTo: '/requisitions' })

	.when('/requisitions', {
		controller: 'RequisitionCtrl',
		templateUrl: 'views/guide/requisitions.html'
	})

	.when('/parts', {
		controller: 'PartCtrl',
		templateUrl: 'views/guide/parts.html'
	})

	.when('/mo', {
		controller: 'MOCtrl',
		templateUrl: 'views/guide/mo.html'
	})

	.when('/others', {
		controller: 'OtherCtrl',
		templateUrl: 'views/guide/others.html'
	})

	.otherwise({ redirectTo: '/' });

})


.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}])



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





