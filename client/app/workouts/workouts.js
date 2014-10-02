'use strict';

angular.module('liftbroApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workouts', {
        url: 'workouts',
        controller: 'WorkoutsCtrl',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'app/workouts/workouts.html'
          }
        }
      })
      .state('dashboard.add-workout', {
        url: 'workouts/add',
        views: {
          '': {
            controller: 'WorkoutsCtrl',
            templateUrl: 'app/workouts/partials/add-workout/add-workout.html'
          },
          'new-workout@dashboard.add-workout': {
            templateUrl: 'app/workouts/partials/add-workout/new-workout.html'
          }
        }
      })
      .state('dashboard.add-workout.choose-exercise', {
        templateUrl: 'app/workouts/partials/add-workout/partials/choose-exercise.html'
      })
      .state('dashboard.add-workout.add-set', {
        templateUrl: 'app/workouts/partials/add-workout/partials/add-set.html'
      })
      .state('dashboard.workouts-index', {
        url: 'workouts/index',
        controller: 'DashboardCtrl',
        templateUrl: 'app/workouts/partials/index.html',
        resolve: {
          fetchWorkouts: function(Workouts) {
            Workouts.index(11);
          }
        }
      });
  });