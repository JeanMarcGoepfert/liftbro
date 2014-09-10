'use strict';

angular.module('liftbroApp')
  .controller('WelcomeCtrl', function ($scope, Auth, $location) {
    //redirect to dashboard if user is logged in
    if (Auth.isLoggedIn()) {
      $location.path('dashboard');
    }

    $scope.welcome = {
      messages: [
      'Ready to lift?',
      'Pumped for a workout?',
      'Lets get lifting!'
      ]
    };

    $scope.welcome.randomMessage = $scope.welcome.messages[Math.floor(Math.random() * $scope.welcome.messages.length)];
  });