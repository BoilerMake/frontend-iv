'use strict';
angular.module('app')
.controller('PodsController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
  ApiRest.one('pods/list').get().then(function(data) {
      $scope.pods = data;
    });
   ApiRest.one('pods/events').get().then(function(data) {
     $scope.events = data;
   });
   ApiRest.one('pods/scans').get().then(function(data) {
     $scope.scans = data;
   });

}]);
