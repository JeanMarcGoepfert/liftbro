'use strict';

angular.module('liftbroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        authenticate: true,
        controller: 'DashboardCtrl',
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            abstract: true
          },
          'addWorkout@dashboard': {
            templateUrl: '/app/dashboard/partials/add-workout.html'
          }
        }
      });
  });