'use strict';

angular.module('liftbroApp')
  .controller('WorkoutsCtrl', function($scope, $state, Exercises, Workouts, Sets) {

    $scope.exercises = { list: [] };
    $scope.workouts = { newWorkout: { sets: [] } };
    $scope.sets = { newSet: { repeating: false, reps: [] } };

    Exercises.index()
    .then(function(data) {
      $scope.exercises.list = data;
    }, function(err) {
      //todo - handle error correctly
      console.log(err);
    });

    $scope.selectExercise = function(exercise) {
      $scope.exercises.selectedExercise = exercise;
      $scope.sets.newSet.exerciseId = exercise._id;
      $scope.sets.newSet.exerciseName = exercise.name;
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

    $scope.createNewReps = function(reps) {
      //create new workout first if it hasn't been created yet
      if (!$scope.workouts.newWorkout._id) {
        Workouts.add({})
        .then(function(data) {
          $scope.workouts.newWorkout._id = data._id;
          addRepsToSet(reps);
        });
      } else {
        addRepsToSet(reps);
      }
    };

    function addRepsToSet(reps) {
      $scope.sets.newSet.reps.push(angular.copy(reps));

      if (!$scope.sets.newSet._id) {
        Sets.add($scope.sets.newSet)
        .then(function(data) {
          $scope.sets.newSet = data;
          addSetToWorkout(data);
        });
      } else {
        Sets.update($scope.sets.newSet._id, $scope.sets.newSet)
        .then(function(data) {
          $scope.sets.newSet = data;
          addSetToWorkout(data);
        });
      }
    };

    function addSetToWorkout(set) {
      //add the new set if it's the first one, otherwise update the existing set.
      if (set.reps.length === 1) {
        $scope.workouts.newWorkout.sets.push(set);
      } else {
        $scope.workouts.newWorkout.sets[$scope.workouts.newWorkout.sets.length - 1] = set;
      }

      $scope.sets.newReps = {};
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