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


.run(['Utils', '$rootScope', function (Utils, $rootScope) {



	$rootScope.print = function () {
		if (Object.keys($rootScope.params).length < 1) {
			return window.alert('Vous devez effectuer une recherche avant d\'imprimer');
		}
		var query = '';
		for (var p in $rootScope.params) {
			if ($rootScope.params.hasOwnProperty(p)) {
				query += '&' + p + '=' + $rootScope.params[p];
			}
		}
		var url = 'http://paradevsrv02/ReportServer?/' + $rootScope.report + '&rs:Command=Render&rc:Toolbar=true' + query;

		Utils.popupWindow(url, 1100, 800);
	}

}])


.factory('Utils', [function () {

  var service = {};

  service.popupWindow = function (url, width, height, hasFeatures) {
    var screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft;
    var screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop;
    var outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : document.body.clientWidth;
    var outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : (document.body.clientHeight-22);
    var left = window.parseInt(screenX + ((outerWidth - width) / 2), 10);
    var top = window.parseInt(screenY + ((outerHeight - height) / 2.5), 10);
    var features = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;

    if (hasFeatures === 'undefined') {
    	hasFeatures = true;
    }

    if (hasFeatures) {
	    features = features.concat(',scrollbars=no,toolbar=no,menubar=no,status=no,location=no,directories=no');
    }

    var newWindow = window.open(url, '', features);

    if (typeof window.focus !== 'undefined') {
      newWindow.focus();
    }

    return newWindow;
  };

  return service;


}]); 




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





