'use strict';

angular.module('liftbroApp')
  .factory('Sets', function($q, $http, Workouts) {
    var service = {};

    service.add = function(set, workoutId) {
      var deferred = $q.defer();
      set.workoutId = workoutId;
      $http.post('/api/sets/', set)
        .success(function(res) {
          delete Workouts.previews[workoutId];
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
          delete Workouts.previews[newSet.workoutId];
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
          delete Workouts.previews[set.workoutId];
          deferred.resolve();
        }, function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    return service;
  });
