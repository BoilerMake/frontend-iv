angular.module('app')
  .controller('ExecUserDetailController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$stateParams','$state','Analytics',
    function ($rootScope, $scope,  ApiRest,ngToast, urls, $stateParams, $state, Analytics) {
      $scope.app_id=$stateParams.id;
      var loadData = function()
      {
        ApiRest.one('execs/users/'+$stateParams.id+'/view').get().then(function(data) {
          $scope.user = data;
        });
        ApiRest.one('execs/users/'+$stateParams.id+'/analytics').get().then(function(data) {
          $scope.analytics = data;
        });
      };
      loadData();

      $scope.doAction = function(action)
      {
        Analytics.event('exec-user-detail-action',{'action':action})
        ApiRest.all('execs/users/'+$stateParams.id+'/action').post({action: action}).then(function(data)
        {

        });
      };
      $scope.doAction("test");
    }]);
