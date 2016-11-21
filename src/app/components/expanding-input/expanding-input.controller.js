'use strict';
angular.module('app')
.controller('ExpandingInputCtrl', function ($scope,$location,$localStorage,Auth,$window,Restangular,ApiRest,$timeout, ngToast, $state) {

  $scope.me = $localStorage.me;
  $scope.roles = Auth.getRoles();
  $scope.loggedIn = $localStorage.me !== undefined;
  $scope.expanded = false;

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
      email: $scope.email,
      password: $scope.password
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
    if ($scope.expanded) $scope.signup();
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
