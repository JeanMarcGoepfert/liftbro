'use strict';

angular.module('liftbroApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('exercises', {
        url: '/exercises',
        controller: 'ExercisesCtrl',
        views: {
          '': {
            templateUrl: 'app/exercises/exercises.html'
          },
          'addExercise@exercises': {
            templateUrl: 'app/exercises/partials/add-exercise.html',
          },
          'exerciseList@exercises': {
            templateUrl: 'app/exercises/partials/exercise-list.html',
          }
        }
      });
  });