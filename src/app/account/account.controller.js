'use strict';
angular.module('app')
.controller('RestrictedController', ['$rootScope', '$scope', 'ApiRest','$localStorage', function ($rootScope, $scope, ApiRest,$localStorage) {
    ApiRest.one('users/me').get().then(function(data) {
      $scope.me = data;
    });
  }])
  .controller('AccountDetailController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls', function ($rootScope, $scope,  ApiRest,ngToast, urls) {


  
    ApiRest.one('users/me').get().then(function(data) {
      $scope.me = data;
    });
    $scope.updateMe = function()
    {
      //TODO
      ApiRest.all('users/me').customPUT($scope.me).then(function(data)
      {
        console.log(data);
        ngToast.create({
          className: 'success',
          content: '<a>Account details updated!</a>'
        });
      })
    }
  }])
  .controller('ApplicationController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$timeout',
   function ($rootScope, $scope,  ApiRest,ngToast, urls, $timeout) {
    ApiRest.one('users/me/application').get().then(function(data) {
      $scope.me.application = data;
    });
    ApiRest.one('users/me').get().then(function(data) {
      $scope.me = data;
    });
    var timeout = null;
    var saveApplication = function()
    {
      ApiRest.all('users/me').customPUT($scope.me).then(function(data)
      {
        console.log(data);
        ngToast.create({
          className: 'success',
          content: '<a>Application Saved!</a>'
        });
      });
    }
    
    var debounceSaveUpdates = function(newVal, oldVal) {
    if (newVal != oldVal) {
      if (timeout) {
        $timeout.cancel(timeout)
      }
      timeout = $timeout(saveApplication, 1000);  // 1000 = 1 second
    }
  };
  $scope.$watch('me', debounceSaveUpdates, true);

    $scope.updateApplication = function()
    {
      saveApplication();
    }
  }]);
