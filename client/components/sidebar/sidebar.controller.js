'use strict';

angular.module('liftbroApp')
  .controller('SidebarCtrl', function ($rootScope, $scope) {
    $rootScope.$watch('currentState', function(val) {
      $scope.currentState = val;
    });

  });
