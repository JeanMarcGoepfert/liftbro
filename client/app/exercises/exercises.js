'use strict';

angular.module('liftbroApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.exercises', {
        url: 'exercises',
        views: {
          '': {
            controller: 'ExercisesCtrl',
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