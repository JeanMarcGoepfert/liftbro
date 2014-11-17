'use strict';

describe('Controller: ExercisesCtrl', function () {

  // load the controller's module
  beforeEach(module('liftbroApp'));

  var ExercisesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExercisesCtrl = $controller('ExercisesCtrl', {
      $scope: scope
    });
  }));

  //it('should ...', function () {
  //  expect(1).toEqual(1);
  //});
});
