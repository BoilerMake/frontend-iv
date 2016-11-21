'use strict';

angular.module('app')

.controller('HomeController', ['$rootScope', '$scope', '$window', '$location', '$localStorage', 'Auth', 'ApiRest', 'Restangular', 'urls','ngToast',
	function($rootScope, $scope, $window, $location, $localStorage, Auth, ApiRest, Restangular, urls, ngToast) {

		$scope.loggedIn = $localStorage.me !== undefined;


    angular.element($window).bind('resize', function(){
      document.getElementById("bodyId").style.height = document.getElementById("angularWrapper").offsetHeight;
    });


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
				$location.path('dashboard');
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
				$scope.loggedIn = false;
			});
		};
		$scope.token = $localStorage.token;
		$scope.tokenClaims = Auth.getTokenClaims();
	}
])
  .controller('ForgotPasswordController', ['$scope', 'ApiRest', function($scope, ApiRest) {

    $scope.state = {email:'', showingSuccessMessage:false};

    $scope.sendReset = function() {
      ApiRest.all('users/reset/send').customPOST({email:$scope.state.email})
        .then(function() {
          $scope.state.showingSuccessMessage = true;
          //TODO: more helpful erroring
        });
    };

    $scope.sendEnabled = function() {
      return $scope.state.email.length > 0;
    };

  }])
  .controller('PasswordResetController', ['$scope', '$state', 'ApiRest', '$location', function($scope, $state, ApiRest, $location) {

    $scope.state = {newPassword:'', newPasswordRepeat:''};

    $scope.setNewPassword = function() {
      ApiRest.all('users/reset/perform')
             .customPOST(
               {
                 token:$location.search().tok,
                 password:$scope.state.newPassword
               })
             .then(function()
             {
                $state.go('signin');
             });
    };

    $scope.setNewPasswordEnabled = function() {
      return $scope.state.newPassword === $scope.state.newPasswordRepeat &&
        $scope.state.newPassword.length >= 4 &&
        $location.search().tok;
    };

  }]);
