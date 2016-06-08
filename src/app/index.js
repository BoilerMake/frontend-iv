'use strict';
// create the module and name it app
// also include ngRoute for all our routing needs
var app = angular.module('app', ['ngStorage','ui.router','ngAnimate','restangular','ui.bootstrap','ngToast','angularMoment','ngFileUpload']);

// configure our routes
app.config(['$httpProvider','$locationProvider','$urlRouterProvider','$stateProvider', function ($httpProvider,$locationProvider, $urlRouterProvider,$stateProvider) {

    $stateProvider
    /**
     * PUBLIC PAGES
     */
        .state('home', {
            url: '/',
            templateUrl: 'app/main/landing.html',
            controller: 'LandingController',
            bodyClass: 'body-splash'
        }).
        state('about', {
            url: '/about',
            templateUrl: 'app/main/about.html',
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
        data: {roles: 'users'}
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
      state('forgot-password', {
        url:'/forgot-password',
        templateUrl:'app/main/forgot-password.html',
        controller:'ForgotPasswordController'
      }).
      state('password-reset', {
        url:'/pwr',
        templateUrl:'app/main/password-reset.html',
        controller:'PasswordResetController'
      }).
    /**
     * EXEC SECTION
     */
    state('exec-pods', {
      url: '/exec/pods',
      templateUrl: 'app/exec/pods.html',
      controller: 'PodsController',
      data: {roles: 'exec'}
    }).
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
      }).
     state('exec-users', {
        url: '/exec/users',
        templateUrl: 'app/exec/exec-users.html',
        controller: 'ExecUsersController',
        data: {roles: 'exec'}
      }).
     state('exec-hackers', {
        url: '/exec/hackers',
        templateUrl: 'app/exec/exec-hackers.html',
        controller: 'ExecHackersController',
        data: {roles: 'exec'}
      }).
     state('exec-teams', {
        url: '/exec/teams',
        templateUrl: 'app/exec/exec-teams.html',
        controller: 'ExecTeamsController',
        data: {roles: 'exec'}
      }).
     state('exec-events', {
        url: '/exec/events',
        templateUrl: 'app/exec/exec-events.html',
        controller: 'ExecEventsController',
        data: {roles: 'exec'}
      });
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function ($injector) {
      $injector.invoke(['$state', function ($state) { $state.go('notfound'); }]);
      return true;
    });
}]);
