'use strict';
angular.module('app')
.controller('ExecController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls', function ($rootScope, $scope,  ApiRest,ngToast, urls) {
  ApiRest.one('execs/hackers').get().then(function(data) {
      $scope.hackers = data;
    });
  }]);
