'use strict';

angular.module('liftbroApp')
  .controller('WorkoutsCtrl', function($scope, $state, Alert, Exercises, Workouts, Sets) {
    //setup for adding workouts
    $scope.exercises = { list: [] };
    $scope.workouts = { workout: { sets: [] }, list: [], limit: 10, count: undefined, editingReps: {}, chartStats: {} };
    $scope.sets = { newSet: { repeating: false, reps: [] } };
    $scope.rootState = '^.choose-exercise';

    /*
    All exercises are required for all workout views.

    Exercises are cached in service after first load,
    so shouldn't require extra requests.
     */
    Exercises.index()
      .then(function(data) {
        $scope.exercises.list = data;
      }, function() {
        Alert.set({
          type: 'danger',
          message: 'Couldn\'t fetch exercises!'
        });
      });

    /*
    Set up for single workout view.

    Saving rootState so we can go back to it after updating exercise.
     */
    if ($state.params.id) {
      $scope.workouts.workout = Workouts.single;
      $scope.rootState = '^.intro-stats';
    }

    /*
     For workout index view, initially fetch first 11 workouts.
     And get the total workout count.

     Workouts lists is cached in service, so won't need extra
     requests unless new workouts are added.
     */
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


    $scope.selectExercise = function(exercise, set) {
      setSelectedExercise(exercise);

      /*
      if we're editing an existing set, we pass in
      the set we're editing here, set is at the newSet.
      */
      if (set) { $scope.sets.newSet = set; }

      $state.go('^.add-set');
    };

    $scope.addExercise = function(exercise) {
      Exercises.add(exercise)
        .then(function(data) {
          $scope.selectExercise(data);
        }, function() {
          Alert.set({
            type: 'danger',
            message: 'Couldn\'t add exercise!'
          });
        });
    };

    $scope.createNewReps = function(reps, form) {
      //create new workout first if it hasn't been created yet
      if (!$scope.workouts.workout._id) {
        Workouts.add({})
          .then(function(data) {
            $scope.workouts.workout = data;
            Sets.setTotals = {};
            addRepsToSet(reps);
          });
      } else {
        addRepsToSet(reps);
      }

      form.$setPristine(true);
    };

    $scope.finishSet = function() {
      resetNewSet();
      if ($state.current.name === 'dashboard.workout-single.add-set') {
        $state.go('dashboard.workout-single.intro-stats');
      } else {
        $state.go('^.choose-exercise');
      }
    };

    $scope.finishWorkout = function() {
      $state.go('dashboard');

      Alert.set({
        type: 'success',
        message: 'Workout created, nice one!',
        button: {
          text: 'View',
          nghref: 'workouts/' + $scope.workouts.workout._id
        }
      });
    };

    $scope.increaseWorkoutLimit = function() {
      var newLimit = $scope.workouts.limit + 10;
      Workouts.index(newLimit)
        .then(function(data) {
          $scope.workouts.list = data;
          $scope.workouts.limit = newLimit;
        }, function() {
          Alert.set({
            type: 'danger',
            message: 'Couldn\'t fetch workouts!'
          });
        });
    };

    $scope.deleteWorkout = function(workout, confirmMsg) {
      //todo replace this with pretty modal
      if (confirmMsg) {
        if (!confirm(confirmMsg)) { return; }
      }

      Workouts.remove(workout)
        .then(function() {
          Sets.setTotals = {};
          $state.go('dashboard');
          Alert.set({ type: 'success', message: 'Workout deleted, better luck next time!' });
        }, function() {
          Alert.set({
            type: 'danger',
            message: 'Couldn\'t remove workout!'
          });
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

    $scope.setEditReps = function(set, reps) {
      resetNewSet();

      var sets = $scope.workouts.workout.sets;
      var editReps = $scope.workouts.editingReps = angular.copy(reps);
      editReps.setIndex = sets.indexOf(set);
      editReps.repsIndex = sets[editReps.setIndex].reps.indexOf(reps);
      $state.go('^.edit-reps');
    };

    $scope.updateReps = function(reps, state, form) {
      var workout = $scope.workouts.workout;

      $scope.sets.newSet = workout.sets[reps.setIndex];
      $scope.sets.newSet.reps[reps.repsIndex] = reps;

      addRepsToExistingSet(reps.setIndex, function() {
        $state.go(state);
        Alert.set({ type: 'success', message: 'Reps updated' });
      });

      if (form) {
        form.$setPristine(true);
      }
    };

    function addRepsToNewSet() {
      Sets.add($scope.sets.newSet, $scope.workouts.workout._id)
        .then(function(data) {
          $scope.sets.newSet = data;
          addSetToWorkout(data);
          addWorkoutToList();
        });
    }

    function addRepsToExistingSet(setIndex, callback) {
      Sets.update($scope.sets.newSet._id, $scope.sets.newSet)
        .then(function(data) {
          /*
          get the index of the current set being edited ($scope.sets.newSet)
          and pass through to addSetToWorkout function. In case of set
          being added index will always be 0. But we need to account for
          editing sets after workout has been created.
          */
          if (!angular.isNumber(setIndex)) {
            setIndex = $scope.workouts.workout.sets.indexOf($scope.sets.newSet);
          }

          $scope.sets.newSet = data;
          addSetToWorkout(data, setIndex);
          addWorkoutToList();
          if (angular.isFunction(callback)) { callback(); }
        });
    }

    function addWorkoutToList() {
      /*
      if workout exists in list, update it, otherwise prepend
      new workout. Reverse loops as we're usually editing more recent workouts
      */
      var listLength = Workouts.list.length;

      if (!listLength) {
        Workouts.list.unshift($scope.workouts.workout);
      } else {
        for (var i = listLength - 1; i >= 0; i--) {
          if (Workouts.list[i]._id === $scope.workouts.workout._id) {
            Workouts.list[i] = $scope.workouts.workout;
            return;
          }
        }
        Workouts.list.unshift($scope.workouts.workout);
      }
    }

    function addSetToWorkout(set, index) {
      /*
      if a reps is currently being editedm updated it and set
      reset editing reps.

      Otherwise if the set has only one rep, meaning this set has
      just been created, prepend it to the list. Otherwise, update
      the specified (or most recent if unspecified) set.
      */

      if (angular.isNumber($scope.workouts.editingReps.setIndex)) {
        //editing rep in existing set
        $scope.workouts.workout.sets[index] = angular.copy(set);
        $scope.workouts.editingReps = {};
        resetNewSet();

      } else {

        index = index || 0;
        if (set.reps.length === 1) {
          //new set
          $scope.workouts.workout.sets.unshift(set);
        } else {
          //adding existing set
          $scope.workouts.workout.sets[index] = set;
        }
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
