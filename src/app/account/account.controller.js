'use strict';
angular.module('app')
.controller('AccountDetailController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','Auth', function ($rootScope, $scope,  ApiRest,ngToast, urls, Auth) {

  $scope.roles = Auth.getRoles();

  ApiRest.one('users/me').get().then(function(data) {
    $scope.me = data;
    $scope.short_name = data.first_name ? data.first_name : 'Hacker';
    ApiRest.one('users/me/application').get().then(function(data) {
        $scope.pageLoaded = true;
        $scope.validation = data.validation;
    });
  });
  $scope.updateMe = function()
  {
      //TODO
      ApiRest.all('users/me')
      .customPUT($scope.me)
      .then(function(data)  {
        console.log(data);
        ngToast.create({
          className: 'success',
          content: '<a>Account details updated!</a>'
        });
      })
    }
  }])
.controller('ApplicationController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$timeout','$http','Upload',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $timeout, $http, Upload) {
  $scope.pageLoaded = false;
  $scope.showErrors = false;
  $scope.isErrors = false;

  $rootScope.skills = ['java'];
  $rootScope.availableSkills = ['python','js','obj-c','php','swift','css','html','ruby','C','android','java','design','ios','go','hardware','mobile','webdev'];

   /* Frontend application stuff */
  $scope.appGenders = ['I\'d rather not provide this information', 'Male', 'Female', 'Other'];
  $scope.appGraduations = ['2017', '2018', '2019', '2020', 'Other'];
  $scope.appRaces = ['I\'d rather not provide this information', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'American Indian or Alaska Native', 'White', 'Other'];
  $scope.placeholders = {
    'first_name': 'First name',
    'last_name': 'Last name',
    'school': 'Name of school or university',
    'gender': 'Select an option',
    'race': 'Select an option',
    'github': 'Username',
    'major': 'Name of major or concentration',
    'graduation': 'Select year of graduation'
  };


  /* End of frontend application stuff */

  var fetchData = function()
  {
    ApiRest.one('users/me').get().then(function(data) {
      $scope.me = data;
      ApiRest.one('users/me/application').get().then(function(data) {
        $scope.pageLoaded = true;
        $scope.me.application = data.application;
        $rootScope.skills = data.application.skills;
        $scope.phase= data.phase;
        $scope.teamsEnabled= data.teamsEnabled;
        $scope.validation = data.validation;
        $scope.resume_view_url = data.resume_view_url;
      });
    });
  }
  fetchData();
  $scope.isSaved = true;
  $scope.showErrors = false;

  $scope.lastSaved = new Date();
  var timeout = null;

  $scope.schoolSearch = function(name) {
    return ApiRest.one('schools').get({filter: name}).then(function(data) {
      return data;
    });
  };

  $scope.toggleErrors = function(val) {
    $scope.showErrors = val;
  };


  var saveApplication = function(reload)
  {
    console.log("aa",$rootScope.skills);
    $scope.me.application.skills = angular.copy($rootScope.skills);

    ApiRest.all('users/me').customPUT($scope.me).then(function(data)
    {
      $scope.validation = data.validation;
      $scope.lastSaved = new Date();
      if(reload)
        fetchData();
      $scope.isSaved=true;
    });
  }


  var debounceSaveUpdates = function(newVal, oldVal) {
    if($scope.me===undefined)
      return;
    if($scope.me.application===undefined)
      return;
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
   var debounceSaveUpdates2 = function(newVal, oldVal) {
     if($scope.me===undefined)
       return;
     if($scope.me.application===undefined)
       return;
     $scope.isSaved=false;
     if (newVal != oldVal) {
       if (timeout) {
         $timeout.cancel(timeout)
       }
       timeout = $timeout(function () {
           saveApplication(false);
       }, 1000);  // 1000 = 1 second
     }
   };
  $scope.$watch('me', debounceSaveUpdates, true);
  $rootScope.$watch('skills', debounceSaveUpdates2, true);

    //$scope.me.application.isTravellingFromSchool =1;
    $scope.changeNeedsTravelReimbursement = function(mode)
    {
      $scope.me.application.needsTravelReimbursement = mode;
    };

    $scope.changeExperience = function(mode)
    {
      $scope.me.application.isFirstHackathon = mode;
    };

    $scope.hasNoGithub = function() {
      $scope.me.application.has_no_github=true;
      console.log("no");
    };
    $scope.hasGithub = function() {
      $scope.me.application.has_no_github=false;
      console.log("yes");
    };
    $scope.updateApplication = function(reload)
    {
      saveApplication(reload);
    };
    $scope.rsvp = function (resp) {
      $scope.me.application.rsvp = resp;
      saveApplication(false);
    }
    $scope.forceSave = function() {
      saveApplication(true);
    };
    $scope.leaveTeam = function()
    {
      ApiRest.all('users/me/leaveteam').customPUT().then(function(data)
      {
        console.log(data);
        saveApplication(true);
      });
    };

    ApiRest.one('users/me/resumePUT').get().then(function(data) {
      $scope.resume_PUT=data;
    });
    $scope.dynamic=0;
    $scope.isUploading=false;
    $scope.upload = function (file) {
      if(file==null)
      {
        ngToast.create({
          className: 'warning',
          content: 'Error with file upload! Make sure it is a pdf!'
        });
        return;
      }
      $scope.isUploading=true;
      Upload.upload({
        url: $scope.resume_PUT,
        data: {file: file},
        method: 'PUT'
      }).then(function (resp) {
        console.log('Success');
        $scope.me.application.resume_uploaded=true;
        $scope.me.application.resume_filename=file.name;
        $scope.isUploading=false;
        saveApplication(true);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.dynamic=progressPercentage;
        console.log('progress: ' + progressPercentage + '% ');
      });
    };
  }]);
