'use strict';
angular.module('app')
.controller('ExecHackersController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
  ApiRest.one('execs/hackers').get().then(function(data) {
      $scope.hackers = data;
    });
  $scope.rateApplications = function()
  {
  	ApiRest.one('execs/applications/next').get().then(function(data) {
      if(data)
        	$state.go('exec-application-detail', {id:data});
        else
        	$state.go('exec');
    });
  };
  }]);
