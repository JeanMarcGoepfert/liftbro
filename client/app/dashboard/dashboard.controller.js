'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts, Exercises, Sets, Alert) {
    $scope.workouts = { list: [], previews: [] };
    $scope.exercises = { list: [] };
    $scope.sets = { totals: {} };

    Workouts.getCount()
      .then(function(data) {
        $scope.workouts.count = data;
      });


    Exercises.index()
      .then(function(data) {
        $scope.exercises.list = data;
        getWorkouts();
      }, function() {
        Alert.set({
          type: 'danger',
          message: 'Couldn\'t fetch exercises!'
        });
      });

    Sets.getSetTotals()
      .then(function(data) {
        $scope.sets.totals.repsTotals = { labels: [], datasets: [{ data: [] }] };
        $scope.sets.totals.weightTotals = { labels: [], datasets: [{ data: [] }] };
        $scope.sets.startDate = data.startDate;
        for (var key in data.totals) {
          $scope.sets.totals.repsTotals.labels.push(data.totals[key].name);
          $scope.sets.totals.weightTotals.labels.push(data.totals[key].name);
          $scope.sets.totals.repsTotals.datasets[0].data.push(data.totals[key].totalReps);
          $scope.sets.totals.weightTotals.datasets[0].data.push(data.totals[key].totalWeight);
        }
      }, function() {
        Alert.set({
          type: 'danger',
          message: 'Couldn\'t fetch workout totals!'
        });
      });

    function getWorkouts() {
      Workouts.index(6)
        .then(function(data) {
          $scope.workouts.list = data;
          getWorkoutPreviews(3);
        }, function() {
          Alert.set({
            type: 'danger',
            message: 'Couldn\'t fetch workouts!'
          });
        });
    }

    function getWorkoutPreviews(amount) {
      Workouts.preview(amount)
        .then(function(data) {
          $scope.workouts.previews = data;
        }, function() {
          Alert.set({
            type: 'danger',
            message: 'Couldn\'t fetch workout previews!'
          });
        });
    }
  });
