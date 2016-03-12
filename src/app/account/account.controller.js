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
  .controller('ApplicationController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$timeout','$http',
   function ($rootScope, $scope,  ApiRest,ngToast, urls, $timeout, $http) {
    
    var fetchData = function()
    {
      ApiRest.one('users/me').get().then(function(data) {
      $scope.me = data;
      ApiRest.one('users/me/application').get().then(function(data) {
        $scope.me.application = data;
      });
    });
    }
    fetchData();
    $scope.isSaved = true;
    $scope.lastSaved = new Date();
    var timeout = null;

     $scope.schoolSearch = function(name) {
    return ApiRest.one('schools').get({filter: name}).then(function(data) {
      console.log(data);
      return data;
    });
  };


    var saveApplication = function(reload)
    {
      ApiRest.all('users/me').customPUT($scope.me).then(function(data)
      {
        $scope.lastSaved = new Date();
        // ngToast.create({
        //   className: 'success',
        //   content: '<a>Application Saved!</a>'
        // });
        if(reload)
          fetchData();
        $scope.isSaved=true;
      });
    }

    var debounceSaveUpdates = function(newVal, oldVal) {
      $scope.isSaved=false;
    if (newVal != oldVal) {
      if (timeout) {
        $timeout.cancel(timeout)
      }
      timeout = $timeout(function () {
        if(newVal.application.team_code!=undefined && oldVal.application.team_code!=undefined) 
        {
          if(!(newVal.application.team_code != oldVal.application.team_code))
            saveApplication(false);
        }
        saveApplication(false);
      }, 1000);  // 1000 = 1 second
    }
  };
  $scope.$watch('me', debounceSaveUpdates, true);
  $scope.$watch('selectedSchool', function(newval,oldval) {
    if($scope.me===undefined)
      return;
    if($scope.me.application===undefined)
      return;
    $scope.me.application.school_id=$scope.selectedSchool.id;
    saveApplication(true);
  }, true);

    $scope.updateApplication = function(reload)
    {
      saveApplication(reload);
    }
    $scope.leaveTeam = function()
    {
      ApiRest.all('users/me/leaveteam').customPUT().then(function(data)
      {
        console.log(data);
        saveApplication(true);
      });
    }
  }]);
