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
          element.find('.row-item-' + elIndex).addClass('show-edit-options');
        };

        scope.hideEditOptions = function() {
          element.find('.show-edit-options').removeClass('show-edit-options');
        };
      }
    };
  });