'use strict';
angular.module('app')
.controller('ExecTeamsController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
  ApiRest.one('execs/teams').get().then(function(data) {
      $scope.teams = data;
    });

}]);
