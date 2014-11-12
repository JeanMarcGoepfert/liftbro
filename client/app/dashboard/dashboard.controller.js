'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts, Exercises) {
    $scope.workouts = {
      list: [],
    };
    $scope.exercises = {
      list: [],
    };

    Workouts.index(6)
    .then(function(data) {
      $scope.workouts.list = data;
      getExercises();
    }, function(err) {
      //todo handle error
      console.log(err);
    });

    function getExercises() {
      Exercises.index()
      .then(function(data) {
        $scope.exercises.list = data;
      }, function(err) {
        //todo handle error
        console.log(err);
      });
    }

    $scope.viewWorkout = function(workout) {
      Workouts.navigateToWorkout(workout);
    };
  });