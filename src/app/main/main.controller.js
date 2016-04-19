'use strict';

angular.module('app')

.controller('HomeController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth', 'ApiRest', 'Restangular', 'urls','ngToast',
	function($rootScope, $scope, $location, $localStorage, Auth, ApiRest, Restangular, urls, ngToast) {

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
				$location.path('account');
			});

		}

		$scope.signin = function() {
			var formData = {
				email: $scope.email,
				password: $scope.password
			};

			Auth.signin(formData, successAuth, function() {
				ngToast.create({
					className: 'danger',
					content: '<span>Uh oh! Check your credentials!</span>'
				});
			});
		};

		$scope.signup = function() {
			var formData = {
				email: $scope.email,
				password: $scope.password,
				first_name: $scope.first_name,
				last_name: $scope.last_name
			};

			Auth.signup(formData, successAuth, function() {
				$rootScope.error = 'Failed to signup';
			});
		};

		$scope.logout = function() {
			Auth.logout(function() {
				window.location = '/';
			});
		};
		$scope.token = $localStorage.token;
		$scope.tokenClaims = Auth.getTokenClaims();
	}
]);
