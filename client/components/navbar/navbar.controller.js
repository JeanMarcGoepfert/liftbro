'use strict';

angular.module('liftbroApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth) {

    $rootScope.homeLink = $rootScope.homeLink || 'login';

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if ($location.path() === '/login') {
      $scope.homeLink = 'login';
    } else {
      $scope.homeLink = 'dashboard';
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
