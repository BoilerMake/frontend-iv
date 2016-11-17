'use strict';
angular.module('app')
.controller('ExpandingInputCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.me = $localStorage.me;
  $scope.roles = Auth.getRoles();
  $scope.loggedIn = $localStorage.me !== undefined;
  $scope.hideNavbar = true;

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

  // Hide/show navbar
  console.log($window);
  angular.element($window).bind("scroll", function(e) {
    $scope.$apply(function () {
      if ($window.scrollY < 500) {
        $scope.hideNavbar = true;
      } else {
        $scope.hideNavbar = false;
      }
    });
  }); 

});
