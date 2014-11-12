'use strict';

angular.module('liftbroApp')
  .controller('ExercisesCtrl', function($scope, Exercises) {
    $scope.exercises = {
      newExercise: {}
    };
    $scope.exercises = { list: [] };

    Exercises.index()
    .then(function(data) {
      $scope.exercises.list = data;
    }, function(err) {
      //todo - handle error correctly
      console.log(err);
    });

    $scope.addExercise = function(exercise, form) {
      Exercises.add(exercise)
      .then(function(data) {
        $scope.exercises.addExercise = {};
      }, function(err) {
        //todo error handle
        console.log(err);
      });

      form.$setPristine(true);
    };
  });