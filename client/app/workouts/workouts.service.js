'use strict';

angular.module('liftbroApp')
  .factory('Workouts', function($q, $http) {
    var service = {};
    service.list = [];

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

    service.index = function(start, end) {
      var deferred = $q.defer();
      if (service.list.length && end <= service.list.length) {
        deferred.resolve(service.list);
      } else {
        $http({
            url: '/api/workouts/',
            method: 'GET',
            params: {start: start, end: end}
         })
        .success(function(res) {
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    return service;
  });