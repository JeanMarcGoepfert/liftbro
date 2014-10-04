'use strict';

angular.module('liftbroApp')
  .controller('WorkoutsCtrl', function($scope, $state, Exercises, Workouts, Sets) {
    $scope.exercises = { list: [] };
    $scope.workouts = { newWorkout: { sets: [] }, list: [], limit: 10 };
    $scope.sets = { newSet: { repeating: false, reps: [] } };

    //always need all exercises
    Exercises.index()
    .then(function(data) {
      $scope.exercises.list = data;
    }, function(err) {
      //todo - handle error correctly
      console.log(err);
    });

    //for workout index, initially fetch first 11 workouts
    if ($state.current.name === 'dashboard.workouts-index') {
      Workouts.index(11).then(function(data) {
        $scope.workouts.list = data;
      });
    }

    $scope.selectExercise = function(exercise) {
      setSelectedExercise(exercise);
      $state.go('dashboard.add-workout.add-set');
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
          $scope.workouts.newWorkout = data;
          addRepsToSet(reps);
        });
      } else {
        addRepsToSet(reps);
      }
    };

    $scope.finishSet = function() {
      resetNewSet();
      $state.go('dashboard.add-workout.choose-exercise');
    };

    $scope.finishWorkout = function() {
      $state.go('dashboard');
    };

    $scope.increaseWorkoutLimit = function() {
      var newLimit = $scope.workouts.limit + 10;
      Workouts.index(newLimit)
      .then(function(data) {
        $scope.workouts.list = data;
        $scope.workouts.limit = newLimit;
      }, function(err) {
        //todo handle error
        console.log(err);
      });
    };

    function addRepsToSet(reps) {
      $scope.sets.newSet.reps.unshift(angular.copy(reps));

      if (!$scope.sets.newSet._id) {
        addRepsToNewSet();
      } else {
        addRepsToExistingSet();
      }
    }

    function addRepsToNewSet() {
      Sets.add($scope.sets.newSet, $scope.workouts.newWorkout._id)
      .then(function(data) {
        $scope.sets.newSet = data;
        addSetToWorkout(data);
        addWorkoutToList();
      });
    }

    function addRepsToExistingSet() {
      Sets.update($scope.sets.newSet._id, $scope.sets.newSet)
      .then(function(data) {
        $scope.sets.newSet = data;
        addSetToWorkout(data);
        addWorkoutToList();
      });
    }

    function addWorkoutToList() {
      /*
      if workout exists in list, update it, otherwise prepend
      new workout
      */
      if (Workouts.list.length && Workouts.list[0]._id === $scope.workouts.newWorkout._id) {
        Workouts.list[0] = $scope.workouts.newWorkout;
      } else {
        Workouts.list.unshift($scope.workouts.newWorkout);
      }
    }

    function addSetToWorkout(set) {
      //add the new set if it's the first one, otherwise update the latest one.
      if (set.reps.length === 1) {
        $scope.workouts.newWorkout.sets.unshift(set);
      } else {
        $scope.workouts.newWorkout.sets[0] = set;
      }

      $scope.sets.newReps = {};
    }

    function setSelectedExercise(exercise) {
      $scope.exercises.selectedExercise = exercise;
      $scope.sets.newSet.exerciseId = exercise._id;
      $scope.sets.newSet.exerciseName = exercise.name;
      $scope.sets.newSet.exerciseMetric = exercise.metric;
    }

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