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
  }]);
