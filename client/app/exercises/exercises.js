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
      })
      .state('dashboard.exercise-single', {
        url: 'exercises/:id',
        authenticate: true,
        controller: 'ExerciseSingleCtrl',
        templateUrl: 'app/exercises/partials/single.html',
        resolve: {
          exerciseDetails: function(Exercises, $stateParams) {
            return Exercises.getSingleStats($stateParams.id);
          }
        }
      });
  });
