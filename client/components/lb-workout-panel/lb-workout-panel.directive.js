'use strict';

angular.module('liftbroApp')
  .directive('lbWorkoutPanel', function() {
    return {
      restrict: 'AE',
      scope: true,
      templateUrl: '/components/lb-workout-panel/lb-workout-panel.html',
      link: function(scope, element) {

        scope.showEditOptions = function(elIndex) {
          scope.hideEditOptions();
          scope.activeIndex = elIndex;
        };

        scope.hideEditOptions = function() {
          scope.activeIndex = null;
        };
      }
    };
  });