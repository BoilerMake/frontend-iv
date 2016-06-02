'use strict';
angular.module('app')
.controller('ExecApplicationDetailController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$stateParams','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $stateParams, $state) {
 	$scope.app_id=$stateParams.id;
  	var loadData = function()
    {
      ApiRest.one('execs/applications/'+$stateParams.id+'/view').get().then(function(data) {
        $scope.application = data;
      });
    }
   loadData();
  $scope.rankApplication = function(rating_num)
  {
  	ApiRest.all('execs/applications/'+$stateParams.id+'/rate').customPUT({rating: rating_num}).then(function(data)
      {
        console.log(data);
        ngToast.create({
          className: 'success',
          content: '<a>Rated '+rating_num+'!</a>'
        });
        if(data.next)
        	$state.go('exec-application-detail', {id:data.next});
        else
        	$state.go('exec');
      })
  };
  $scope.skipApplication = function()
  {
  	ApiRest.one('execs/applications/next').get().then(function(data) {
      if(data)
        	$state.go('exec-application-detail', {id:data});
        else
        	$state.go('exec');
    });
  };
   $scope.addNote = function()
   {
     ApiRest.all('execs/applications/'+$stateParams.id+'/notes').post({message: $scope.noteMessage}).then(function()
     {
       $scope.noteMessage="";
       loadData();
     });
   };
  }]);
