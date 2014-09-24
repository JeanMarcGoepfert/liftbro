'use strict';

angular.module('liftbroApp')
  .factory('Workouts', function($q, $http) {
    var service = {};

    service.add = function(workout) {
      var deferred = $q.defer();

      $http.post('/api/workouts/', workout)
      .success(function(res) {
        deferred.resolve(res);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    return service;
  });