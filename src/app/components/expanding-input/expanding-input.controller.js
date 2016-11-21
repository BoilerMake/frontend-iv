'use strict';
angular.module('app')
.controller('ExpandingInputCtrl', function ($scope,$location,$localStorage,Auth,$window,Restangular,ApiRest,$timeout, ngToast, $state, urls) {

  $scope.me = $localStorage.me;
  $scope.roles = Auth.getRoles();
  $scope.loggedIn = $localStorage.me !== undefined;
  $scope.expanded = false;
  $scope.isMobile = $window.innerWidth <= 767;

  $scope.logout = function() {
    Auth.logout(function() {
     $location.path('/');
   });
  };

  function successAuth(res) {
      console.log(res);
      if(!res.token) {
        ngToast.create({
          className: 'danger',
          content: '<span>Uh oh! '+res.error+'</span>'
        });
        return;
      }

      $localStorage.token = res.token;
      Restangular.setBaseUrl(urls.BASE_API);
      var auth_header = 'Bearer ' + res.token;
      Restangular.setDefaultHeaders({
        Authorization: auth_header
      });
      ApiRest.setDefaultHeaders({
        Authorization: auth_header
      });

      Restangular.one('users/me').get().then(function(data) {
        console.log(data);
        $localStorage.me = data;
        $location.path('dashboard');
      });

    }

  $scope.signup = function() {
    var formData = {
      email: $scope.signupEmail,
      password: $scope.signupPassword
    };

    Auth.signup(formData, successAuth, function() {
      $rootScope.error = 'Failed to signup';
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
    if (shouldExpand && $scope.expanded) {
      $scope.signup();
      return;
    }
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

  $scope.maybeShouldExpand = function() {
    if (!$scope.expanded) {
      $scope.expanded = true;
    }
  };

  function successAuth(res) {
    if(!res.token) {
      ngToast.create({
        className: 'danger',
        content: '<span>Uh oh! '+res.error+'</span>'
      });
      return;
    }

    $localStorage.token = res.token;
    Restangular.setBaseUrl(urls.BASE_API);
    var auth_header = 'Bearer ' + res.token;
    Restangular.setDefaultHeaders({
      Authorization: auth_header
    });
    ApiRest.setDefaultHeaders({
      Authorization: auth_header
    });

    Restangular.one('users/me').get().then(function(data) {
      console.log(data);
      $localStorage.me = data;
      $location.path('dashboard');
    });

  }

  $scope.signup = function() {
    var formData = {
      email: document.getElementById("emailInput_" + $scope.$id).value,
      password: document.getElementById("passwordInput_" + $scope.$id).value
    };

    Auth.signup(formData, successAuth, function() {
      $rootScope.error = 'Failed to signup';
    });
  };

  angular.element($window).bind('resize', function(){
    $scope.$apply(function () {
      $scope.isMobile = $window.innerWidth <= 767;
    });
  });

});
