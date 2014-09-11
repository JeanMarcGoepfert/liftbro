'use strict';

describe('Controller: WorkoutsCtrl', function () {

  // load the controller's module
  beforeEach(module('liftbroApp'));

  var WorkoutsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkoutsCtrl = $controller('WorkoutsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
