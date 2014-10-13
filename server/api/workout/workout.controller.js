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
var Set = require('../set/set.model');

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
    return res.json(200, exercises);
  });
};

//gets count of workouts
exports.count = function(req, res) {
  Workout.count({userId: req.user._id}, function(err, count) {
    if(err) { return handleError(res, err); }
    return res.json(count);
  })
};

//Get a single workout with all its sets
exports.show = function(req, res) {
  //find the sets associated with workout id
  Set.find({workoutId: req.params.id}, function(err, sets) {
    if(err) { return handleError(res, err); }
    if(!sets) { return res.send(404); }

    //find the workout, and add the sets in
    Workout.findById(req.params.id, function (err, workout) {
      if(err) { return handleError(res, err); }
      if(!workout) { return res.send(404); }

      workout.sets = sets.reverse();

      return res.json(workout);
    });

  })
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

//removes workout sets and workout from db
exports.destroy = function(req, res) {
  Workout.find({_id: req.params.id})
  .remove(function(err) {
    if(err) { return handleError(res, err); }
    Set.find({workoutId: req.params.id})
    .remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.json(201);
    })
  });
};

function handleError(res, err) {
  return res.send(500, err);
}