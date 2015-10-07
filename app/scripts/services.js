'use strict';

/*jshint unused:false*/
/*jshint asi:true*/



angular.module('AngularSharePointApp')


.factory('GuideAPI', ['$http', function ($http) {

	var server = 'http://localhost:1337';
	// var server = 'http://parasrv12.parachem.ca:8002';
	var service = {};

	function _search (path, params) {
		if (typeof params === 'undefined') {
			params = {};
		}
		return $http.post(server + path + '/search', params);
	}

	function _calculate (path, params) {
		if (typeof params === 'undefined') {
			params = {};
		}
		return $http.post(server + path + '/calculate', params);
	}


	service.Part = {
		calculate: function (params) {
			return _calculate('/part', params);
		},
		search: function (params) {
			return _search('/partdetail', params);
		}
	};


	service.WorkHour = {
		calculate: function (params) {
			return _calculate('/workhour', params);
		},
		search: function (params) {
			return _search('/workhourdetail', params);
		},
	};


	service.Other = {
		calculate: function (params) {
			return _calculate('/other', params);
		},
		search: function (params) {
			return _search('/otherdetail', params);
		},
	};


	service.Requisition = {
		calculate: function (params) {
			return _calculate('/report', params);
		},
		search: function (params) {
			return _search('/report', params);
		},
	};

	return service;

}])








