'use strict';

angular.module('liftbroApp')
  .directive('lbWorkoutPanel', function() {
    return {
      restrict: 'AE',
      //scope: false,
      templateUrl: 'components/lb-workout-panel/lb-workout-panel.html',
      link: function(scope) {

        scope.showEditOptions = function(elIndex) {
          scope.hideEditOptions();
          scope.activeIndex = elIndex;
        };

        scope.hideEditOptions = function() {
          scope.activeIndex = null;
        };

        scope.$parent.$watch('workouts.workout.sets', function() {
            scope.activeIndex = null;
        }, true);
      }
    };
  });
