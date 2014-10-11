/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sets              ->  index
 * POST    /sets              ->  create
 * GET     /sets/:id          ->  show
 * PUT     /sets/:id          ->  update
 * DELETE  /sets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Set = require('./set.model');
var Workout = require('../workout/workout.model');

//removes set from db and setId from workout
exports.destroy = function(req, res) {
  var workoutId;

  Set.findById(req.params.id, function(err, set) {
    if(err) { return handleError(res, err); }
    workoutId = set.workoutId;
  }).remove(function() {
    Workout.findById(workoutId, function(err, workout) {
      if(err) { return handleError(res, err); }
      if(!workout) { return res.send(404); }

      workout.sets.splice(workout.sets.indexOf(req.params.id), 1);

      workout.save(function(err) {
        if (err) { return handleError(res, err); }
        return res.json(201);
      });
    });
  });
};

// Creates a new set in the DB.
exports.create = function(req, res) {
  var set = new Set(req.body);
  set.userId = req.user._id;

  Set.create(set, function(err, set) {
    if(err) { return handleError(res, err); }

    Workout.findById(set.workoutId, function(workoutErr, workout) {
      if (workout.sets.indexOf(req.body._id) === -1) {

        workout.sets.unshift({_id: set._id});

        workout.save(function(err) {
          if (err) { return handleError(res, err); }

          return res.json(201, set);
        });
      }
    });

  });
};

//Updates an existing set in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Set.findById(req.params.id, function (err, set) {
    if (err) { return handleError(res, err); }
    if(!set) { return res.send(404); }

    var updated = set;
    updated.reps = req.body.reps;
    updated.workoutId = req.body.workoutId;
    updated.exerciseName = req.body.exerciseName;
    updated.exerciseMetric = req.body.exerciseMetric;
    updated.exerciseId = req.body.exerciseId;

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, set);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}