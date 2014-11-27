'use strict';

angular.module('liftbroApp')
  .factory('Sets', function($q, $http, Workouts) {
    var service = {};
    service.setTotals = { current: false };

    service.add = function(set, workoutId) {
      var deferred = $q.defer();
      set.workoutId = workoutId;
      $http.post('/api/sets/', set)
        .success(function(res) {
          Workouts.previews = [];
          service.setTotals = {};
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    service.update = function(setId, newSet) {
      var deferred = $q.defer();

      $http.put('/api/sets/' + setId, newSet)
        .success(function(res) {
          Workouts.previews = [];
          service.setTotals = {};
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    service.remove = function(set) {
      var deferred = $q.defer();

      $http.delete('/api/sets/' + set._id)
        .success(function() {
          Workouts.previews = [];
          service.setTotals = {};
          deferred.resolve();
        }, function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    service.getSetTotals = function() {
      var deferred = $q.defer();

      if (service.setTotals.current) {
        deferred.resolve(service.setTotals.total);
      } else {
        $http.get('/api/sets/getTotals')
          .then(function(res) {
            service.setTotals.total = res.data;
            service.setTotals.current = true;
            deferred.resolve(res.data);
          });
      }

      return deferred.promise;
    };

    return service;
  });
