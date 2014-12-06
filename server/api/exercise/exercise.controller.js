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
var Exercise = require('./exercise.model');
var Set = require('../set/set.model');

// Get list of exercises
exports.index = function(req, res) {
  Exercise.find({userId: req.user._id})
  .sort({$natural: -1})
  .exec(function(err, exercises) {
    if(err) { return handleError(res, err); }
    return res.json(200, exercises);
  });
};

// Get exercise stats
exports.stats = function(req, res) {
  Exercise.findById(req.params.id, function(err, exercise) {
    if(err) { return handleError(res, err); }

    Set.find({ 'exercise._id': req.params.id }, function(err, sets) {
      if(err) { return handleError(res, err); }

      var stats = {
        name: exercise.name,
        metric: exercise.metric,
        totalReps: 0,
        totalWeight: 0,
        firstSetDate: sets.length ? sets[0]._id.getTimestamp() : undefined,
        latestSetDate: sets.length ? sets[sets.length - 1]._id.getTimestamp() : undefined,
        sets: []
      };

      sets.forEach(function(val) {
        var repsAmount = 0,
          repsWeight = 0;

        if (val.reps.length === 1) {
          repsAmount = val.reps[0].amount;
          repsWeight = val.reps[0].weight;
        } else if (val.reps.length > 1) {
          repsAmount = val.reps.reduceRight(function(a, b) { return a + b.amount }, 0);
          repsWeight = val.reps.reduceRight(function(a, b) { return a + b.weight }, 0);
        }

        stats.totalReps += repsAmount;
        stats.totalWeight += repsWeight;

        stats.sets.push({ date: val._id.getTimestamp(), weight: repsWeight, reps: repsAmount });
      });

      stats.sets.sort(function(obj1, obj2) {
        return new Date(obj1.date) - new Date(obj2.date);
      });

      return res.json(200, stats);
    });
  });
};

// Creates a new exercise in the DB.
exports.create = function(req, res) {
  var exercise = new Exercise(req.body);
  exercise.userId = req.user._id;

  Exercise.create(exercise, function(err, exercise) {
    if(err) { return handleError(res, err); }
    return res.json(201, exercise);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
