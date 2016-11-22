'use strict';
angular.module('app')
.controller('ExecController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {

  $scope.rateApplications = function()
  {
  	ApiRest.one('execs/applications/next').get().then(function(data) {
      if(data)
        	$state.go('exec-application-detail', {id:data});
        else
        	$state.go('exec');
    });
  };

   ApiRest.one('execs/allstats').get().then(function(data) {
     $scope.allstats = data;
   });
}]);
