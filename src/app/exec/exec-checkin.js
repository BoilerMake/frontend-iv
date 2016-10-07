'use strict';
angular.module('app')
.controller('ExecCheckinController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
   var loadData = function()
   {
     ApiRest.one('pods/list').get().then(function(data) {
       $scope.pods = data;
       if($scope.pods_static==undefined)
         $scope.pods_static=angular.copy(data);
     });
     ApiRest.one('pods/events').get().then(function(data) {
       $scope.events = data;
     });
     ApiRest.one('pods/scans').get().then(function(data) {
       $scope.scans = data;
     });
   };
   loadData();


   $scope.processScan = function()
   {
     if($scope.scanning_pod==undefined)
     {
       $scope.scanning_result = {message: 'please select a pod to identify as'};
       return;
     }


     ApiRest.all('pods/scan').post({pod_id: $scope.scanning_pod, code: $scope.scanning_code}).then(function(response)
     {
       $scope.scanning_code = "";
       $scope.scanning_result = response;
       loadData();
     });


     console.log($scope.scanning_pod, $scope.scanning_code);





   }

}]);
