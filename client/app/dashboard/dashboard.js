'use strict';

angular.module('liftbroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            abstract: true
          },
          'home@dashboard': {
            controller: 'DashboardCtrl',
            templateUrl: 'app/dashboard/partials/stats.html',
          },
          'alert@dashboard': {
            controller: 'AlertCtrl',
            templateUrl: 'components/alert/alert.html'
          }
        }
      });
  });