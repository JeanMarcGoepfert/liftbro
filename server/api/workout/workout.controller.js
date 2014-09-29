/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /workouts              ->  index
 * POST    /workouts              ->  create
 * GET     /workouts/:id          ->  show
 * PUT     /workouts/:id          ->  update
 * DELETE  /workouts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Workout = require('./workout.model');

//gets list of workouts
exports.index = function(req, res) {
  var start = req.query.start;
  var end = req.query.end;

  Workout.find({userId: req.user._id})
  .sort({$natural: -1})
  .skip(start)
  .limit(end)
  .exec(function (err, exercises) {
    if(err) { return handleError(res, err); }
    return res.json(200, exercises.reverse());
  });
};

// Creates a new workout in the DB.
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