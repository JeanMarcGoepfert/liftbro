'use strict';

angular.module('liftbroApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('workouts', {
        url: '/workouts',
        controller: 'WorkoutsCtrl',
        views: {
          '': {
            templateUrl: 'app/workouts/workouts.html'
          }
        }
      });
  });