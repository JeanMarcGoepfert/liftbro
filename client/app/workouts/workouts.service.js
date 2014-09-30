'use strict';

angular.module('liftbroApp')
  .factory('Workouts', function($q, $http) {
    var service = {
      initialized: false,
      list: []
    };

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

    service.index = function(end) {
      var deferred = $q.defer();

      /*
      if index has already been called and we
      already have the workouts being
      requested: return cached copy, otherwise
      proceed with request and append result to
      cached list.

      When requesting more workouts, request
      items starting from last current workout
      (workout.length), and upto end param passed
      to function.
      */
      if (service.initialized && service.list.length < end) {
        deferred.resolve(service.list);
      } else {
        $http({
            url: '/api/workouts/',
            method: 'GET',
            params: {start: service.list.length, end: end}
         })
        .success(function(res) {
          service.initialized = true;
          service.list = service.list.concat(res);
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    return service;
  });