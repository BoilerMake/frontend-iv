'use strict';
angular.module('app')
.controller('ExecEventsController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
  ApiRest.one('events').get().then(function(data) {
  	console.log(data);
      $scope.events = data;
    });
}]);
