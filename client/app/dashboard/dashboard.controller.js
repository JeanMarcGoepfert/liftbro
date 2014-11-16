'use strict';

angular.module('liftbroApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth, Workouts, Exercises, $http) {
    $scope.workouts = {
      list: [],
      recent: [1, 2, 3]
    };
    $scope.exercises = {
      list: [],
    };

    Workouts.index(6)
    .then(function(data) {
      $scope.workouts.list = data;
      getExercises();

        if ($scope.workouts.list.length) {
          $http.get('/api/workouts/preview/' + $scope.workouts.list[0]._id)
            .success(function(res) {
              console.log(res);
            });
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

    $scope.viewWorkout = function(workout) {
      Workouts.navigateToWorkout(workout);
    };
  });
