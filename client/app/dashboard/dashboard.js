'use strict';

angular.module('liftbroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            abstract: true
          }
        }
      });
  });