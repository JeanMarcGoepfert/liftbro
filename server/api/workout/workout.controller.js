/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /exercises              ->  index
 * POST    /exercises              ->  create
 * GET     /exercises/:id          ->  show
 * PUT     /exercises/:id          ->  update
 * DELETE  /exercises/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Workout = require('./workout.model');

// Creates a new exercise in the DB.
exports.create = function(req, res) {
  var workout = new Workout(req.body);
  workout.userId = req.user._id;
  workout.dateCreated = Date.now();

  Workout.create(workout, function(err, workout) {
    if(err) { return handleError(res, err); }
    return res.json(201, workout);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}