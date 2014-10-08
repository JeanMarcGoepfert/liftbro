'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, $rootScope, Auth, Workouts) {
    $scope.workouts = {
      list: [],
    };

    $scope.closeAlert = function() {
      $rootScope.alert = {};
    };

    Workouts.index(6)
    .then(function(data) {
      $scope.workouts.list = data;
    }, function(err) {
      //todo handle error
      console.log(err);
    });

    $scope.viewWorkout = function(workout) {
      Workouts.navigateToWorkout(workout);
    };
  });