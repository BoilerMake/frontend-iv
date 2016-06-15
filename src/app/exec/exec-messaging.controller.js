'use strict';
angular.module('app')
.controller('ExecMessagingController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
    var loadData = function()
    {
      ApiRest.one('execs/messaging/group').get().then(function(data) {
        $scope.messages = data;
      });
    };
   loadData();

   $scope.sendGroupMessage = function()
   {
     ApiRest.all('execs/messaging/group').post({group: $scope.messageGroup, message: $scope.messageBody}).then(function(data)
     {
       loadData();
     });
   }

}]);
