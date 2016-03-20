'use strict';
angular.module('app')
.controller('ExecUsersController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
  ApiRest.one('execs/users').get().then(function(data) {
      $scope.users = data;
    });

}]);
