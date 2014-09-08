'use strict';

angular.module('liftbroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: 'app/welcome/welcome.html',
        controller: 'WelcomeCtrl'
      });
  });