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
      var deffered = $q.defer();

      if (service.latest._id === id) {
        deffered.resolve(service.latest);
      }
      $http.get('/api/exercises/' + id)
      .success(function(res) {
        service.latest = res.data;
        deffered.resolve(service.latest);
      }, function(err) {
        deffered.reject(err);
      });

      return deffered.promise;
    };

    service.add = function(exercise) {

    };

    service.update = function(id, newExercise) {

    };

    service.delete = function(exercise) {

    };

    return service;
  });