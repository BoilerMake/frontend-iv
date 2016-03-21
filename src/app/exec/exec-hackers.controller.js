'use strict';
angular.module('app')
.controller('ExecHackersController', 
['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state','$localStorage','Bulk',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state, $localStorage, Bulk) {
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

  $scope.bulk = Bulk.get();
  $scope.addToBulk = function(h)
  {
    $scope.bulk = Bulk.add(h);
  };
  $scope.removeFromBulk = function(h)
  {
    $scope.bulk = Bulk.remove(h);
  };
  $scope.clearBulk = function()
  {
    $scope.bulk = Bulk.clear();
  };
  }]);
