'use strict';

angular.module('liftbroApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, Alert) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      Alert.set({
        type: 'warning',
        message: 'Sorry, this has been disabled for now, others may need to see this account :)'
      });
      //$scope.submitted = true;
      //if(form.$valid) {
      //  Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
      //  .then( function() {
      //    $scope.message = 'Password successfully changed.';
      //  })
      //  .catch( function() {
      //    form.password.$setValidity('mongoose', false);
      //    $scope.errors.other = 'Incorrect password';
      //    $scope.message = '';
      //  });
      //}
		};
  });
