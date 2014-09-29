"use strict";

describe('Service: Exercises', function () {
  var Exercises,
      httpBackend,
      sampleData = [
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
        ];

  beforeEach(module('liftbroApp'));

  beforeEach(inject(function (_Exercises_, $httpBackend) {
    Exercises = _Exercises_;
    httpBackend = $httpBackend;
  }));

  it('should get and cache an index of exercises', function () {

    httpBackend.whenGET('/api/exercises/').respond(sampleData);

    Exercises.index().then(function(data) {
      expect(data.length).toEqual(3);
      expect(Exercises.list.length).toEqual(3);
      expect(data).toEqual(Exercises.list);
    });

    httpBackend.flush();
  });

  it('should get and cache individual exercise by id', function() {
    httpBackend.whenGET('/api/exercises/111').respond({data: sampleData[0] });

    Exercises.get('111').then(function(data) {
      expect(data).toEqual(sampleData[0]);
      expect(data._id).toEqual('111');
      expect(Exercises.latest).toEqual(data);
    });

    httpBackend.flush();
  });

  it('should add an exercise then store a local copy', function() {
    var post = {name: 'Squat', metric: 'kg'};
    var res = {name: 'Squat', metric: 'kg', _id: '444'};
    Exercises.list = sampleData;
    httpBackend.whenPOST('/api/exercises/', post).respond(res);

    Exercises.add(post).then(function(data) {
      expect(data.name).toEqual(post.name);
      expect(data._id).toEqual('444');
      expect(Exercises.list[0]).toEqual(res);
    });

    httpBackend.flush();
  });

  it('should update an exercise', function() {
    Exercises.list = sampleData;
    var newExercise = {_id: '111', name: 'Pullup', metric: 'kg'};
    httpBackend.whenPUT('/api/exercises/111', newExercise).respond(newExercise);

    Exercises.update(Exercises.list[0], newExercise).then(function(res) {
      expect(res.name).toEqual(newExercise.name);
      expect(res).toEqual(sampleData[0]);
    });
  });

  it('should delete an item and remove it from list', function() {
    Exercises.list = sampleData;
    var itemToDelete = Exercises[1];
    httpBackend.whenDELETE('/api/delete/222').respond(itemToDelete);

    Exercises.delete(Exercises.list[1]).then(function(res) {
      expect(res).toEqual(itemToDelete);
      expect(Exercises.list.indexOf(itemToDelete)).toEqual(-1);
    });
  });

});