'use strict';
angular.module('app')
.factory('ApiRest', function(Restangular,urls,$localStorage,Auth) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(urls.BASE_API);
    var auth_header = 'Bearer '+$localStorage.token;
    RestangularConfigurer.setDefaultHeaders({Authorization: auth_header});

    // RestangularConfigurer.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    //   var extractedData;
    //   extractedData = data.data;
    //   return extractedData;
    // });
  });
})

.factory('Bulk', ['$http', '$localStorage', 'urls','ApiRest',
 function ($http, $localStorage, urls, ApiRest) {

  function clear() {
    $localStorage.bulk = [];
    return [];
  }
  function init() {
    if($localStorage.bulk === undefined)
      $localStorage.bulk = [];
  }
  function get()
  {
    init();
    return $localStorage.bulk;
  }
  function add(h)
  {
    if($localStorage.bulk.indexOf(h) == -1)
      $localStorage.bulk.push(h);
    return $localStorage.bulk;
  }
  function remove(h)
  {
    var index = $localStorage.bulk.indexOf(h);
    $localStorage.bulk.splice(index,1);
    return $localStorage.bulk;
  }
  function refreshHackers()
  {
    init();
    var ids = $localStorage.bulk.map(function(a) {return a.id;});
    ApiRest.all('execs/hackers/bulk').customPOST(ids).then(function(data) {
      $localStorage.bulk = data;
    });
    return $localStorage.bulk;
  }
  function updateHackers(newDecision)
  {
    init();
    var ids = $localStorage.bulk.map(function(a) {return a.id;});
    ApiRest.all('execs/hackers/bulk').customPUT({hackers: ids, decision: newDecision})
    .then(function(data) {
      $localStorage.bulk = data;
      });
    return refreshHackers();
  }
  return {
    clear: clear,
    refresh: refreshHackers,
    updateHackers: updateHackers,
    get: get,
    add: add,
    remove: remove
  };

 }])


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
  function client_id()
  {
    var client = $localStorage.client_id;
    if (typeof client !== 'undefined') {
      return client;
    }
    else
    {
      var client = "a-"+guid();
      $localStorage.client_id = client;
      return client;
    }
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
              url: urls.BASE_API + '/auth',
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
        getClientID: function() {
          return client_id();
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
        },
        isAuthenticated: function() {
          return !($localStorage.me === undefined)
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
  .filter('userSlug', function ()
  {
    return function (userModel)
    {
      if(userModel==null)
        return "no user";
      return userModel.first_name+" "+userModel.last_name+" (#"+userModel.id+")";
    };
  })
  .filter('decision', function ()
  {
    return function (d)
    {
      d = parseInt(d) || 0;
      switch(d) {
      case 0:
          return "undecided";
      case 1:
          return "reject";
      case 2:
          return "waitlist";
      case 3:
          return "accept";
      default:
        return d;
    }
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
  .factory('Analytics', function(ApiRest,urls,$localStorage,Auth,$location,$window) {
  return {
    event: function(name, params, meta)
    {
      params = params || {};
      meta = meta || {};
      meta['ua'] = $window.navigator.userAgent;
      meta['referrer']= document.referrer;
      meta['client']=Auth.getClientID();
      meta['url']= $location.absUrl();
      ApiRest.all('analytics/event').customPUT({name: name, params: params, meta: meta}).then(function(data)
      {
        console.log("sending analytics",{name: name, params: params, meta: meta});
      });
    }
  }
})

/**
 * Access Control for routes
 */
.run(['$rootScope', '$window','Auth','$state','$location', '$localStorage','Analytics', function($rootScope, $window, Auth,$state,$location, $localStorage, Analytics) {
  $rootScope.$on('$stateChangeStart', function(e, toState) {
    //toParams, fromState, fromParams are useable
    if(toState.name=="signin" && Auth.isAuthenticated())
    {
      e.preventDefault();
      $state.go('account');
    }
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
      if(Auth.hasRole('exec'))
      {
        canAccess=true;
      }
      if(permissions=="users" && Auth.getRoles() != undefined)//allow logged in users if permission is 'users'
        canAccess=true;
    }
    if(!canAccess)
    {
      e.preventDefault();
      $state.go('unauthorized');
    }
    $rootScope.bodyClass = toState.bodyClass || "body-default";
    Analytics.event('state-go',{name: toState.name});
  });
}]);
