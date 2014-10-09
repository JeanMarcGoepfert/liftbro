'use strict';

angular.module('liftbroApp')
  .factory('Alert', function() {
    var service = {};
    service.details = {};

    service.set = function(details) {
      service.details = details;
    };

    service.close = function() {
      service.details = {};
    };

    return service;
  });