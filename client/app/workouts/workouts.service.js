'use strict';

angular.module('liftbroApp')
  .factory('Workouts', function($q, $http) {
    var service = {
      itemsRequested: 0,
      counted: false,
      list: [],
      single: {},
      count: 0,
      previews: {}
    };

    service.add = function(workout) {
      var deferred = $q.defer();

      $http.post('/api/workouts/', workout)
        .success(function(res) {
          service.count++;
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    service.remove = function(workout) {
      var deferred = $q.defer();

      $http.delete('/api/workouts/' + workout._id)
        .success(function() {
          /*
          If workout is in local list remove it,
          and decrement itemsRequested count by 1
          to account for removed item.

          If workout is not found, reset the store and set
          itemsRequested back to 0 to force new request.
          This should only happened in rare cases, eg
          workout/:id page is visited directly/refreshed
          so workout isn't populated.

          */

          var workoutIndex = false;

          for (var i = 0; i < service.list.length; i++) {
            if (service.list[i]._id === workout._id) {
              workoutIndex = i;
              break;
            }
          }

          if (angular.isNumber(workoutIndex)) {
            service.list.splice(workoutIndex, 1);
            service.itemsRequested--;
          } else {
            service.list = [];
            service.itemsRequested = 0;
            console.error('Could not find workout in workout service store.');
          }

          delete service.previews[workout._id];
          deferred.resolve();
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

    service.preview = function(workoutId) {
      var deffered = $q.defer();

      /*
      previews being cached, if workout, sets or reps are updated,
      preview should be removed.

      todo: find a better way to do this
       */
      if (service.previews.hasOwnProperty(workoutId)) {
        deffered.resolve(service.previews[workoutId]);
      } else {
        $http.get('/api/workouts/preview/' + workoutId)
          .success(function(res) {
            service.previews[workoutId] = res;
            deffered.resolve(res);
          }, function(err) {
            deffered.reject(err);
          });
      }

      return deffered.promise;
    };

    /*
    todo, do some caching on this.
    */
    service.get = function(id) {
      var deferred = $q.defer();
      $http.get('/api/workouts/' + id)
        .success(function(res) {
          service.single = res;
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    service.getCount = function() {
      var deferred = $q.defer();

      if (service.counted) {
        deferred.resolve(service.count);
      } else {
        $http.get('/api/workouts/count')
          .success(function(res) {
            service.count = res;
            deferred.resolve(res);
          }, function(err) {
            deferred.reject(err);
          });
      }

      return deferred.promise;
    };

    return service;
  });
