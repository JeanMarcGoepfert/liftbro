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

    scope.$apply();
  }));

  it('should contain all exercises at startup', function () {
    expect(scope.exercises.list).toEqual(sampleData);
  });

  it('should set a selected exercise in scope and transition to add set', function() {
    spyOn(state, 'go');
    scope.selectExercise(sampleData.exercises[0]);
    expect(scope.exercises.selectedExercise).toEqual(sampleData.exercises[0]);
    expect(state.go).toHaveBeenCalledWith('dashboard.add-workout.add-sets');
    httpBackend.flush();
  });

  it('should add reps to set', function() {
    scope.addRepsToSet(sampleData.sets[0]);
    expect(scope.sets.newSet.reps[0]).toEqual(sampleData.sets[0]);
    expect(scope.sets.newSet.repeat).toEqual(true);
    expect(scope.sets.newReps).toEqual({});
  });

  it('should reset set and redirect to dashboard.add-workout.choose-exercise', function() {
    scope.exercises.selectedExercise = sampleData.exercises[0];
    scope.exercises.addExercise = sampleData.exercises[0];
    scope.finishSet();
    expect(scope.exercises.selectedExercise).toEqual({});
    expect(scope.exercises.addExercise).toEqual({});
    expect(scope.sets.newSet.repeat).toEqual(false);
  });

  it('should add set to workout, or update existing workout set', function() {
    var sets = {repeat: false, reps: sampleData.sets[0], exercise: sampleData.exercises[0]};
    scope.addSetToWorkout(sets);
    expect(scope.workouts.newWorkout.sets.length).toEqual(1);
    sets.repeat = true;
    scope.addSetToWorkout(sets);
    expect(scope.workouts.newWorkout.sets.length).toEqual(2);
  });
});
