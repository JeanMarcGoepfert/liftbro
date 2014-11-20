'use strict';

angular.module('liftbroApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      title: 'Home',
      link: 'login'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if ($scope.isLoggedIn()) {
      $scope.menu[0].link = 'dashboard';
    }

    $scope.logout = function() {
      Auth.logout();
      $scope.menu[0].link = 'login';
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
