'use strict';

angular.module('liftbroApp')
  .controller('ExercisesCtrl', function($scope, $state, Exercises, Alert) {
    $scope.exercises = {
      newExercise: {}
    };
    $scope.exercises = { list: [] };

    Exercises.index()
    .then(function(data) {
      $scope.exercises.list = data;
    }, function() {
      Alert.set({
        type: 'danger',
        message: 'Couldn\'t fetch exercises!'
      });
    });

    $scope.addExercise = function(exercise, form) {
      Exercises.add(exercise)
      .then(function() {
        $scope.exercises.addExercise = {};
      }, function() {
        Alert.set({
          type: 'danger',
          message: 'Couldn\'t add exercise!'
        });
      });

      form.$setPristine(true);
    };
  });
