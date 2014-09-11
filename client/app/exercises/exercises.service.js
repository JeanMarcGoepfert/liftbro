'use strict';

angular.module('liftbroApp')
  .factory('Exercises', function($q, $http) {
    var service = {};
    service.list = [];
    service.latest = {};

    service.index = function() {
      var deferred = $q.defer();

      if (service.list.length) {
        deferred.resolve(service.list);
      } else {
        $http.get('/api/exercises')
        .success(function(res) {
          service.list = res.data;
          deferred.resolve(service.list);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    service.get = function(id) {
      var deferred = $q.defer();

      if (service.latest._id === id) {
        deferred.resolve(service.latest);
      }
      $http.get('/api/exercises/' + id)
      .success(function(res) {
        service.latest = res.data;
        deferred.resolve(service.latest);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    service.add = function(exercise) {
      var deferred = $q.defer();

      $http.post('/api/exercises/', exercise)
      .success(function(res) {
        service.list.push(res.data);
        deferred.resolve(res.data);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    service.update = function(oldExercise, newExercise) {
      var deferred = $q.defer();
      var index = service.list.indexOf(oldExercise);

      if (index === -1) {
        //todo: error: cannot find exercise
        deferred.reject();
      } else {
        $http.put('/api/exercises/' + oldExercise._id, newExercise)
        .success(function(res) {
          service.list = newExercise;
          deferred.resolve(res.data);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    service.delete = function(exercise) {
      var deferred = $q.defer();
      var index = service.list.indexOf(exercise);

      if (index === -1) {
        //todo: error: cannot find exercise to delete
      } else {
        $http.delete('/api/exercises/' + exercise._id)
        .success(function(res) {
          service.list.splice(index, 1);
          deferred.promise(res.data);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    return service;
  });