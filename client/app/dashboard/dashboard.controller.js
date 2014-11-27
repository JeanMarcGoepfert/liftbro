'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts, Exercises, Sets) {
    $scope.workouts = {
      list: [],
      previews: []
    };
    $scope.exercises = {
      list: []
    };
    $scope.sets = {
      totals: {}
    };

    Workouts.getCount()
      .then(function(data) {
        $scope.workouts.count = data;
      });

    Workouts.index(6)
      .then(function(data) {
        $scope.workouts.list = data;
        getExercises();
        getWorkoutPreviews(3);
      }, function(err) {
        //todo handle error
        console.log(err);
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

    function getWorkoutPreviews(amount) {
        Workouts.preview(amount)
          .then(function(data) {
            $scope.workouts.previews = data;
          }, function(err) {
            //todo handle error
            console.log(err);
          });
    }

    $scope.viewWorkout = function(workout) {
      Workouts.navigateToWorkout(workout);
    };
  });
