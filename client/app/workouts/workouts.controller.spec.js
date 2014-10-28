'use strict';

describe('Controller: WorkoutsCtrl', function () {

  // load the controller's module

  beforeEach(module('liftbroApp'));

  var WorkoutsCtrl,
      scope,
      state,
      exercises,
      httpBackend,
      q,
      sampleData = {
          sets: [
            {amount: '30', weight: '10'},
            {amount: '32', weight: '12'},
            {amount: '10', weight: '14'}
          ],
          exercises: [
                        {
                          _id: '111',
                          name: 'Benchpress',
                          metric: 'kg'
                        },
                        {
                          _id: '222',
                          name: 'Curl',
                          metric: 'kg'
                        },
                        {
                          _id: '333',
                          name: 'Legpress',
                          metric: 'kg'
                        }
                      ]
                    };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($q, $controller, $rootScope, $state, _Exercises_, $httpBackend) {

    scope = $rootScope.$new();
    exercises = _Exercises_;
    httpBackend = $httpBackend;
    state = $state;
    q = $q;

    httpBackend.whenGET('/api/exercises/').respond(sampleData);

    httpBackend.whenPOST('/api/exercises/', sampleData.exercises[0]).respond(sampleData.exercises[0]);

    WorkoutsCtrl = $controller('WorkoutsCtrl', {
      $scope: scope,
      $state: state,
      Exercises: exercises,
      $q: q
    });

    scope.exercises.list = sampleData;
  }));

  it('should contain all exercises at startup', function () {
    expect(scope.exercises.list).toEqual(sampleData);
  });

  it('should select an exercise', function() {
    var selectedExercise = sampleData.exercises[0];
    scope.selectExercise(selectedExercise);

    expect(scope.exercises.selectedExercise).toEqual(selectedExercise);
  });
});
