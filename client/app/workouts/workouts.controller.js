'use strict';

angular.module('liftbroApp')
  .controller('WorkoutsCtrl', function($scope, $state, Alert, Exercises, Workouts, Sets) {
    //setup for adding workouts
    $scope.exercises = { list: [] };
    $scope.workouts = { workout: { sets: [] }, list: [], limit: 10, count: undefined };
    $scope.sets = { newSet: { repeating: false, reps: [] } };

    //setup for single workout
    if ($state.params.id) {
      $scope.workouts.workout = Workouts.single;
    }

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
      Workouts.index(11)
      .then(function(data) {
        $scope.workouts.list = data;
      });

      Workouts.getCount()
      .then(function(data) {
        $scope.workouts.count = data;
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
      if (!$scope.workouts.workout._id) {
        Workouts.add({})
        .then(function(data) {
          $scope.workouts.workout = data;
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

      Alert.set({
        type: 'success',
        message: 'Workout created, nice one!',
        button: {
          text: 'View',
          state: 'dashboard.workout-single({id:"'+ $scope.workouts.workout._id +'"})'
        }
      });
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

    $scope.deleteWorkout = function(workout, confirmMsg) {
      //todo replace this with pretty modal
      if (confirmMsg) {
        if (!confirm(confirmMsg)) { return; }
      }

      Workouts.remove(workout)
      .then(function() {
        $state.go('dashboard');
        Alert.set({ type: 'success', message: 'Workout deleted, better luck next time!' });
      }, function(err) {
        //todo handle error
        console.log(err);
      });
    };

    $scope.deleteSet = function(setIndex) {
      /*
      if it's the last set in workout, delete workout
      otherwise just delete that set
      */
      var workout = $scope.workouts.workout;
      var selectedSet = workout.sets[setIndex];

      if (workout.sets.length === 1) {
        $scope.deleteWorkout(workout, 'This workout will be deleted, continue?');
      } else {
        Sets.remove(selectedSet)
        .then(function() {
          workout.sets.splice(setIndex, 1);
        });
      }
    };

    $scope.deleteReps = function(setIndex, repsIndex) {
      /*
      if the current set has more than 1 reps, simply remove the
      reps from current set. Otherwise, delete set
      */
      var workout = $scope.workouts.workout;
      var selectedSet = workout.sets[setIndex];
      if (selectedSet.reps.length > 1) {
        var setCopy = angular.copy(selectedSet);
        setCopy.reps.splice(repsIndex, 1);

        Sets.update(selectedSet._id, setCopy)
        .then(function(data) {
          workout.sets[setIndex] = data;
        });
      } else {
        $scope.deleteSet(setIndex);
      }
    };

    $scope.workoutsLength = function(list, limit) {
      return Math.min(parseInt(list.length, 10), parseInt(limit, 10));
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
      Sets.add($scope.sets.newSet, $scope.workouts.workout._id)
      .then(function(data) {
        $scope.sets.newSet = data;
        addSetToWorkout(data);
        addWorkoutToList();
      });
    }

    function addRepsToExistingSet() {
      Sets.update($scope.sets.newSet._id, $scope.sets.newSet)
      .then(function(data) {
        /*
        get the index of the current set being edited ($scope.sets.newSet)
        and pass through to addSetToWorkout function. In case of set
        being added index will always be 0. But we need to account for
        editing sets after workout has been created.
        */
        var setIndex = $scope.workouts.workout.sets.indexOf($scope.sets.newSet);
        $scope.sets.newSet = data;
        addSetToWorkout(data, setIndex);
        addWorkoutToList();
      });
    }

    function addWorkoutToList() {
      /*
      if workout exists in list, update it, otherwise prepend
      new workout
      */
      if (Workouts.list.length && Workouts.list[0]._id === $scope.workouts.workout._id) {
        Workouts.list[0] = $scope.workouts.workout;
      } else {
        Workouts.list.unshift($scope.workouts.workout);
      }
    }

    function addSetToWorkout(set, index) {
      /*
      if the set has only one rep, meaning it's just been created,
      prepend it to the list. Otherwise, update the specified (or most recent
      if unspecified) set.
      */

      index = index || 0;

      if (set.reps.length === 1) {
        $scope.workouts.workout.sets.unshift(set);
      } else {
        $scope.workouts.workout.sets[index] = set;
      }

      $scope.sets.newReps = {};
    }

    function setSelectedExercise(exercise) {
      $scope.exercises.selectedExercise = exercise;
      $scope.sets.newSet.exercise = exercise;
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