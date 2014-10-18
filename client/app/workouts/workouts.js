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
      .state('dashboard.workouts-index', {
        url: 'workouts/index',
        authenticate: true,
        controller: 'WorkoutsCtrl',
        templateUrl: 'app/workouts/partials/index.html'
      })
      .state('dashboard.add-workout', {
        url: 'workouts/add',
        authenticate: true,
        abstract: true,
        controller: 'WorkoutsCtrl',
        templateUrl: 'app/workouts/partials/add-workout/add-workout.html'
      })
        .state('dashboard.add-workout.choose-exercise', {
          url: '',
          templateUrl: 'app/workouts/partials/add-workout/partials/choose-exercise.html'
        })
        .state('dashboard.add-workout.add-set', {
          templateUrl: 'app/workouts/partials/add-workout/partials/add-set.html'
        })
      .state('dashboard.workout-single', {
        url: 'workouts/:id',
        authenticate: true,
        abstract: true,
        controller: 'WorkoutsCtrl',
        templateUrl: 'app/workouts/partials/single/single.html',
        resolve: {
          singleWorkout: function(Workouts, $stateParams) {
            return Workouts.get($stateParams.id);
          }
        }
      })
        .state('dashboard.workout-single.intro-stats', {
          url: '',
          templateUrl: 'app/workouts/partials/single/partials/intro-stats.html',
        })
        .state('dashboard.workout-single.choose-exercise', {
          templateUrl: 'app/workouts/partials/add-workout/partials/choose-exercise.html'
        })
        .state('dashboard.workout-single.add-set', {
          templateUrl: 'app/workouts/partials/add-workout/partials/add-set.html'
        })
        .state('dashboard.workout-single.edit-reps', {
          templateUrl: 'app/workouts/partials/add-workout/partials/edit-reps.html'
        });
  });