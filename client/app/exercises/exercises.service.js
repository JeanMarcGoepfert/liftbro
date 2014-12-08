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

        $http.get('/api/exercises/')
          .success(function(res) {
            service.list = res;
            deferred.resolve(service.list);
          })
          .error(function(err) {
            deferred.reject(err);
          });
      }

      return deferred.promise;
    };

    service.getSingleStats = function(id) {
      var deferred = $q.defer();

      $http.get('/api/exercises/' + id)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    service.get = function(id) {
      var deferred = $q.defer();

      if (service.latest._id === id) {
        deferred.resolve(service.latest);
      } else {
        $http.get('/api/exercises/' + id)
          .success(function(res) {
            service.latest = res.data;
            deferred.resolve(service.latest);
          })
          .error(function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    service.add = function(exercise) {
      var deferred = $q.defer();

      $http.post('/api/exercises/', exercise)
        .success(function(res) {
          service.list.unshift(res);
          deferred.resolve(res);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    return service;
  });
