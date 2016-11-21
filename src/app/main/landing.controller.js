angular.module('app')
.controller('LandingController', ['$rootScope', '$scope', '$location', 'ApiRest','ngToast',
	function($rootScope, $scope, $location, ApiRest, $localStorage, ngToast) {
		
		$scope.subscribe = function()
		{
			console.log($scope.email);
			ApiRest.all('interest/signup').customPOST({email: $scope.email}).then(function(data)
		      {
		        console.log(data);
		        ngToast.create({
		          className: 'info',
		          content: '<a>'+data.message+'</a>'
		        });
		      });
		}
	}
]);
