'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts) {
    $scope.workouts = { list: [] };

    Workouts.index(6)
    .then(function(data) {
      $scope.workouts.list = data;
    }, function(err) {
      //todo handle error
      console.log(err);
    });
  });