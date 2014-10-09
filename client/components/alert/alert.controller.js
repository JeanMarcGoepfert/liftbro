'use strict';

angular.module('liftbroApp')
  .controller('AlertCtrl', function ($scope, Alert) {
    $scope.alert = Alert.details;

    $scope.$watch(function() {
      return Alert.details;
    }, function(newVal){
      $scope.alert = newVal;
    });

    $scope.closeAlert = function() {
      Alert.close();
    };
  });