'use strict';

angular.module('liftbroApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workouts', {
        url: '/workouts',
        controller: 'WorkoutsCtrl',
        views: {
          '': {
            templateUrl: 'app/workouts/workouts.html'
          }
        }
      })
      .state('dashboard.add-workout', {
        url: '/workouts/add',
        controller: 'WorkoutsCtrl',
        templateUrl: 'app/workouts/partials/add-workout.html'
      });
  });