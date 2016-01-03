'use strict';
angular.module('app')
.factory('ApiRest', function(Restangular,urls,$localStorage,Auth) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(urls.BASE_API);
    var auth_header = 'Bearer '+$localStorage.token;
    RestangularConfigurer.setDefaultHeaders({Authorization: auth_header});

    RestangularConfigurer.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      extractedData = data.data;
      return extractedData;
    });
  });
})

.factory('Auth', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {
      function urlBase64Decode(str) {
          var output = str.replace('-', '+').replace('_', '/');
          switch (output.length % 4) {
              case 0:
                  break;
              case 2:
                  output += '==';
                  break;
              case 3:
                  output += '=';
                  break;
              default:
                  throw 'Illegal base64url string!';
          }
          return window.atob(output);
      }

      function getClaimsFromToken() {
          var token = $localStorage.token;
          var user = {};
          if (typeof token !== 'undefined') {
              var encoded = token.split('.')[1];
              user = JSON.parse(urlBase64Decode(encoded));
          }
          return user;
      }
      var tokenClaims = getClaimsFromToken();

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
  
      return {
          signup: function (data, success, error) {
            //#todo: test
            $http({
              method: 'POST',
              url: urls.BASE_API + '/users',
              data: $.param(data),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(success).error(error);
          },
          signin: function (data, success, error) {
            $http({
              method: 'POST',
              url: urls.BASE_API + '/tokens',
              data: $.param(data),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(success).error(error);
          },
          logout: function (success) {
              tokenClaims = {};
              $localStorage.$reset();
              console.log('loggin out');
              success();
          },
          getTokenClaims: function () {
              return tokenClaims;
          },
        getRoles: function () {
          return tokenClaims.roles;
        },
        hasRole: function(roleName)
        {
          if($localStorage.me === undefined) { return false;}
          //console.log(Auth.getRoles());
          //if(true){return true;}//debug

					tokenClaims = getClaimsFromToken();

          return tokenClaims.roles.indexOf(roleName) !== -1;
        }
      };
  }
  ])
/**
 * Filter to show pretty dates
 */
.filter('prettyDateFull', function ()
{
  return function (timestring)
  {
    var UtcDate = moment.utc(timestring);
    return moment(UtcDate).local().format('dddd MMMM Do YYYY, h:mm:ss a');
  };
})
.filter('prettyDateShort', function ()
{
  return function (timestring)
  {
    var UtcDate = moment.utc(timestring);
    return moment(UtcDate).local().format('MM/DD/YY, h:mm');
  };
})
  .filter('prettyDate', function ()
  {
    return function (timestring)
    {
      var UtcDate = moment.utc(timestring);
      return moment(UtcDate).local().format('ddd MMM D, h:mm a');
    };
  })
  .filter('prettyTime', function ()
  {
    return function (timestring)
    {
      var UtcDate = moment.utc(timestring);
      return moment(UtcDate).local().format('h:mm a');
    };
  })
  .filter('jsonParse', function ()
  {
    return function (jsonstring)
    {
      return JSON.parse(jsonstring);
    };
  })
/**
 * Configures ngToast
 */
.config(['ngToastProvider', function(ngToast) {
  ngToast.configure({
    verticalPosition: 'top',
    horizontalPosition: 'center',
    maxNumber: 3,
		className:'info'
  });
}])
.directive('capitalize', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
})

/**
 * Access Control for routes
 */
.run(['$rootScope', '$window','Auth','$state','$location', '$localStorage', function($rootScope, $window, Auth,$state,$location, $localStorage) {
  $rootScope.cameFromCL=($location.search().ref=="cl");
  $rootScope.$on('$stateChangeStart', function(e, toState) {
    //toParams, fromState, fromParams are useable
    var permissions;
    permissions = toState && toState.data ? toState.data.roles : null;
    var canAccess;

    if(permissions===null)
    {
      canAccess=true;
    }
    else
    {
      canAccess=Auth.hasRole(permissions);
      if(Auth.hasRole('admin'))
      {
        canAccess=true;
      }
    }
    if(!canAccess)
    {
      e.preventDefault();
      $state.go('unauthorized');
    }

  });
}]);
