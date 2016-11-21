'use strict';
angular.module('app')
.controller('NavbarCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.me = $localStorage.me;
  $scope.roles = Auth.getRoles();
  $scope.loggedIn = $localStorage.me !== undefined;
  $scope.hideNavbar;
  $scope.url;

  $scope.isMobile = $window.innerWidth < 768;

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

  $scope.scrollToForm = function() {
    $window.scrollTo(0, 0);
  };

  // Set navbar initial state
  angular.element(document).ready(function () {
    $scope.url = $location.url().split('?')[0];
    if ($scope.url == '/') {
      $scope.hideNavbar = true;
    } else {
      $scope.hideNavbar = false;
    }
  });

  // Hide/show navbar
  angular.element($window).bind("scroll", function(e) {
    $scope.$apply(function () {
      if ($window.scrollY < 500 && ($scope.url == '/')) {
        $scope.hideNavbar = true;
      } else {
        $scope.hideNavbar = false;
      }
    });
  }); 

  angular.element($window).bind('resize', function(){
    $scope.$apply(function () {
      $scope.isMobile = $window.innerWidth < 768;
    });
  });

});
