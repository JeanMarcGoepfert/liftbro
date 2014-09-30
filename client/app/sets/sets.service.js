'use strict';

angular.module('liftbroApp')
  .factory('Sets', function($q, $http) {
    var service = {};

    service.add = function(set, workoutId) {
      var deferred = $q.defer();
      set.workoutId = workoutId;
      $http.post('/api/sets/', set)
      .success(function(res) {
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
        deferred.resolve(res);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    return service;
  });