'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts) {
    $scope.workouts = {
      list: [],
      limit: 10 //initial limit for index page
    };

    Workouts.index(6)
    .then(function(data) {
      $scope.workouts.list = data;
    }, function(err) {
      //todo handle error
      console.log(err);
    });

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

    $scope.viewWorkout = function(workout) {
      Workouts.navigateToWorkout(workout);
    };
  });