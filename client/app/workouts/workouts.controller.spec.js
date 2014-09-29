'use strict';

describe('Controller: WorkoutsCtrl', function () {

  // load the controller's module

  beforeEach(module('liftbroApp'));

  var WorkoutsCtrl,
      scope,
      state,
      exercises,
      httpBackend,
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

    //todo, figure out how to not have to do this.
    httpBackend.whenGET('/api/exercises/').respond(sampleData);
    httpBackend.when('GET', 'app/dashboard/dashboard.html').respond('somehtml');
    httpBackend.when('GET', 'app/account/login/login.html').respond('somehtml');
    httpBackend.when('GET', 'app/workouts/partials/add-workout/add-workout.html').respond('somehtml');
    httpBackend.when('GET', 'app/workouts/partials/add-workout/partials/choose-exercise.html').respond('somehtml');

    WorkoutsCtrl = $controller('WorkoutsCtrl', {
      $scope: scope,
      $state: state,
      Exercises: exercises,
    });

    scope.exercises.list = sampleData;

    httpBackend.flush();
  }));

  it('should contain all exercises at startup', function () {
    expect(scope.exercises.list).toEqual(sampleData);
  });

  it('should select an exercise', function() {
    var selectedExercise = sampleData.exercises[0];
    scope.selectExercise(selectedExercise);

    expect(scope.exercises.selectedExercise).toEqual(selectedExercise);
    expect(scope.sets.newSet.exerciseId).toEqual(selectedExercise._id);
    expect(scope.sets.newSet.exerciseName).toEqual(selectedExercise.name);
    expect(scope.sets.newSet.exerciseMetric).toEqual(selectedExercise.metric);
  });

  it('should select an exercise', function() {
    var selectedExercise = sampleData.exercises[0];
    scope.selectExercise(selectedExercise);

    expect(scope.exercises.selectedExercise).toEqual(selectedExercise);
    expect(scope.sets.newSet.exerciseId).toEqual(selectedExercise._id);
    expect(scope.sets.newSet.exerciseName).toEqual(selectedExercise.name);
    expect(scope.sets.newSet.exerciseMetric).toEqual(selectedExercise.metric);
  });
});
