'use strict';

angular.module('liftbroApp')
  .factory('Workouts', function($q, $http) {
    var service = {
      itemsRequested: 0,
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
      if end is less than maximum requested workouts
      or current list length, then return what we have
      otherwise request more workouts and set
      new maximum requested workouts.

      When requesting more workouts, request
      items starting from last current workout
      (workout.length), and upto end param passed
      to function.
      */

      if (Math.max(service.itemsRequested, service.list.length) >= end) {
        deferred.resolve(service.list);
      } else {
        $http({
            url: '/api/workouts/',
            method: 'GET',
            params: {start: service.list.length, end: end}
         })
        .success(function(res) {
          service.itemsRequested = end;
          if (end >= service.maxRequested) { service.maxRequested = end; }
          service.list = service.list.concat(res);
          deferred.resolve(service.list);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    return service;
  });