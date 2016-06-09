'use strict';
angular.module('app')
.controller('SponsorController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {

   ApiRest.one('sponsor/info').get().then(function(data) {
     $scope.info = data;
   });
}]);
