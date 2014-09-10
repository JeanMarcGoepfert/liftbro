'use strict';

angular.module('liftbroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        abstract: true,
        authenticate: true
      })
      .state('dashboard.intro', {
        url: '',
        templateUrl: '/app/dashboard/partials/add-exercise.html',
        authenticate: true
      });
  });