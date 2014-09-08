'use strict';

angular.module('liftbroApp')
  .controller('WelcomeCtrl', function ($scope) {
    $scope.welcome = {
      messages: [
      'Ready to lift?',
      'Pumped for a workout?',
      'Lets get lifting!'
      ]
    };
    $scope.welcome.randomMessage = $scope.welcome.messages[Math.floor(Math.random() * $scope.welcome.messages.length)];
  });