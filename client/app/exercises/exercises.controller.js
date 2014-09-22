'use strict';

angular.module('liftbroApp')
  .controller('ExercisesCtrl', function($scope) {
    $scope.exercises = {
      newExercise: {}
    };
  });