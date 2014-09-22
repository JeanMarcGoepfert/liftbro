'use strict';

angular.module('liftbroApp')
  .controller('WorkoutsCtrl', function($scope, $state, Exercises) {

    $scope.exercises = { list: [] };
    $scope.workouts = { newWorkout: { sets: [] } };
    $scope.sets = { newSet: { repeat: false, reps: [] } };

    Exercises.index()
    .then(function(data) {
      $scope.exercises.list = data;
    }, function(err) {
      //todo - handle error correctly
      console.log(err);
    });

    $scope.selectExercise = function(exercise) {
      $scope.exercises.selectedExercise = exercise;
      $scope.sets.newSet.exercise = exercise;
      $state.go('dashboard.add-workout.add-sets');
    };

    $scope.addExercise = function(exercise) {
      Exercises.add(exercise)
      .then(function(data) {
        $scope.selectExercise(data);
      }, function(err) {
        //todo error handle
        console.log(err);
      });
    };

    $scope.addRepsToSet = function(reps) {
      $scope.sets.newSet.reps.push(angular.copy(reps));
      $scope.addSetToWorkout(angular.copy($scope.sets.newSet));
      $scope.sets.newSet.repeat = true;
      $scope.sets.newReps = {};
    };

    $scope.addSetToWorkout = function(set) {
      if ($scope.sets.newSet.repeat === false) {
        $scope.workouts.newWorkout.sets.push(set);
      } else {
        $scope.workouts.newWorkout.sets[$scope.workouts.newWorkout.sets.length - 1] = set;
      }
    };

    $scope.finishSet = function() {
      resetNewSet();
      $state.go('dashboard.add-workout.choose-exercise');
    };

    function resetNewSet() {
      $scope.exercises.selectedExercise = {};
      $scope.exercises.addExercise = {};
      $scope.sets = {
        newSet: {
          repeat: false,
          reps: []
        }
      };
    }
  });