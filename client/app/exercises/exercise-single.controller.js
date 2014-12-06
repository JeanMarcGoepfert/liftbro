'use strict';

angular.module('liftbroApp')
  .controller('ExerciseSingleCtrl', function($scope, $state, Exercises, $http, exerciseDetails) {
    $scope.exerciseDetails = exerciseDetails;
  });
