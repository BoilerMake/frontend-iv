'use strict';
angular.module('app')
.controller('ExpandingInputCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.me = $localStorage.me;
  $scope.roles = Auth.getRoles();
  $scope.loggedIn = $localStorage.me !== undefined;
  $scope.expanded = false;

  $scope.logout = function() {
    Auth.logout(function() {
       $location.path('/');
    });
  };

  $scope.isActive = function(viewLocation) {
    if (viewLocation === '/') {
      return viewLocation === $location.path();
    }

    return $location.path().indexOf(viewLocation) === 0;
  };

  $scope.hasRole = function(roleName) {
    return Auth.hasRole(roleName);
  };

  $scope.expandInput = function() {
    $scope.$apply(function () {
      $scope.expanded = true;
    });
  };

});
