'use strict';

describe('Controller: WelcomeCtrl', function () {

  // load the controller's module
  beforeEach(module('liftbroApp'));

  var WelcomeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WelcomeCtrl = $controller('WelcomeCtrl', {
      $scope: scope
    });
  }));

  it('should return a random welcome message from list of messages', function () {
    expect(scope.welcome.messages.indexOf(scope.welcome.randomMessage) >= 0).toBeTruthy();
  });
});
