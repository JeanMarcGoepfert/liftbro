'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, Auth, Workouts) {
    $scope.workouts = { list: [] };

    Workouts.index(0, 2)
    .then(function(data) {
      $scope.workouts.list = data;
    }, function(err) {
      //todo handle error
      console.log(err);
    });
  });