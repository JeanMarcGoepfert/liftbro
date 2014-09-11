"use strict";

describe('Service: Exercises', function () {
  var Exercises,
      httpBackend,
      sampleData = {
        data: [
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

  beforeEach(module("liftbroApp"));

  beforeEach(inject(function (_Exercises_, $httpBackend) {
    Exercises = _Exercises_;
    httpBackend = $httpBackend;
  }));

  it('should get and cache an index of exercises', function () {

    httpBackend.whenGET('/api/exercises').respond(sampleData);

    Exercises.index().then(function(data) {
      expect(data.length).toEqual(3);
      expect(Exercises.list.length).toEqual(3);
      expect(data).toEqual(Exercises.list);
    });

    httpBackend.flush();
  });

  it('should get and cache individual exercise by id', function() {
    httpBackend.whenGET('/api/exercises/111').respond({data: sampleData.data[0] });

    Exercises.get('111').then(function(data) {
      expect(data).toEqual(sampleData.data[0]);
      expect(data._id).toEqual('111');
      expect(Exercises.latest).toEqual(data);
    });

    httpBackend.flush();
  });

});