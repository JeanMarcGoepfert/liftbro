'use strict';

angular.module('liftbroApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.exercises', {
        url: '/exercises',
        controller: 'ExercisesCtrl',
        views: {
          '': {
            templateUrl: 'app/exercises/exercises.html'
          },
          'addExercise@dashboard.exercises': {
            templateUrl: 'app/exercises/partials/add-exercise.html',
          },
          'exerciseList@dashboard.exercises': {
            templateUrl: 'app/exercises/partials/exercise-list.html',
          }
        }
      });
  });