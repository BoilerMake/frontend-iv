'use strict';
// create the module and name it app
// also include ngRoute for all our routing needs
var app = angular.module('app', ['ngStorage','ui.router','ngAnimate','restangular','ui.bootstrap','ngToast']);

// configure our routes
app.config(['$httpProvider','$locationProvider','$urlRouterProvider','$stateProvider', function ($httpProvider,$locationProvider, $urlRouterProvider,$stateProvider) {

    $stateProvider
    /**
     * PUBLIC PAGES
     */
        .state('home', {
            url: '/',
            templateUrl: 'app/main/landing.html',
            controller: 'HomeController'
        }).
        state('signin', {
            url: '/signin',
            templateUrl: 'app/main/signin.html',
            controller: 'HomeController'
        }).
        state('signup', {
            url: '/signup',
            templateUrl: 'app/main/signup.html',
            controller: 'HomeController'
        }).
      state('notfound', {
        templateUrl: 'app/main/errors/404.html'
      }).
      state('unauthorized', {
        templateUrl: 'app/main/errors/401.html'
      }).
    /**
     * USER SECTION
     */
      state('account', {
            url: '/account',
            templateUrl: 'app/account/account.html',
            controller: 'RestrictedController',
        data: {roles: 'hacker'}
      }).
      state('application', {
            url: '/application',
            templateUrl: 'app/account/application.html',
            controller: 'ApplicationController',
        data: {roles: 'hacker'}
      }).
      state('account-edit', {
        url: '/account/edit',
        templateUrl: 'app/account/edit.html',
        controller: 'AccountDetailController',
        data: {roles: 'hacker'}
      }).
    /**
     * EXEC SECTION
     */
     state('exec-application-detail', {
        url: '/exec/applications/:id',
        templateUrl: 'app/exec/application-detail.html',
        controller: 'ExecApplicationDetailController',
        data: {roles: 'exec'}
      }).
     state('exec', {
        url: '/exec',
        templateUrl: 'app/exec/exec-dash.html',
        controller: 'ExecController',
        data: {roles: 'exec'}
      });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function ($injector) {
      $injector.invoke(['$state', function ($state) { $state.go('notfound'); }]);
      return true;
    });
}]);
