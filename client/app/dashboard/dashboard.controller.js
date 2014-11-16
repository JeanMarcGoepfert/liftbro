'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts, Exercises, $http) {
    $scope.workouts = {
      list: [],
      previews: []
    };
    $scope.exercises = {
      list: [],
    };


    Workouts.getCount()
      .then(function(data) {
        $scope.workouts.count = data;
      });

    Workouts.index(6)
      .then(function(data) {
        $scope.workouts.list = data;
        getExercises();
        getWorkoutPreviews(angular.copy($scope.workouts.list).splice(0, 3).map(function(val) { return val._id; }));
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

    function getWorkoutPreviews(workoutIds) {
      workoutIds.forEach(function(val) {
        Workouts.preview(val)
          .then(function(data) {
            $scope.workouts.previews.push(data);
          }, function(err) {
            //todo handle error
            console.log(err);
          })
      });
    }

    $scope.viewWorkout = function(workout) {
      Workouts.navigateToWorkout(workout);
    };
  });
