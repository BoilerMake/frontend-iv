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

  $scope.expandInput = function(shouldExpand) {
    if (shouldExpand) {
      $scope.expanded = true;
      var emailEl = document.getElementById("emailInput_" + $scope.$id);
      var passwordEl = document.getElementById("passwordInput_" + $scope.$id);
      if (!emailEl.value || emailEl.value == "") {
        emailEl.focus();
      } else {
        passwordEl.focus();
      }
    } else {
      $scope.expanded = false;
    }
  };

  if ($window.innerWidth <= 767 && $scope.expanded == false) {
    $scope.expanded = true;
  }

  angular.element($window).bind('resize', function(){
    console.log($window.innerWidth);
    $scope.$apply(function () {
      if ($window.innerWidth <= 767 && $scope.expanded == false) {
        $scope.expanded = true;
      }
    });
  });

});
