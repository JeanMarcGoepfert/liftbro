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

exports.getTotals = function(req, res) {
  Set.find({userId: req.user._id}, function(err, sets) {
    if(err) { return handleError(res, err); }
    var sortedSets = { totals: {} };

    if (sets.length) {
      sortedSets.startDate = sets[0]._id.getTimestamp();
    }

    sets.forEach(function(val) {

      var exId = val.exercise._id;
      var repsSum = 0;
      var weightSum = 0;

      if (val.reps.length === 1) {
        repsSum = val.reps[0].amount;
        weightSum = val.reps[0].weight;
      } else if (val.reps.length > 1) {
        repsSum = val.reps.reduce(function(a, b) {
          return a.amount + b.amount;
        });
        weightSum = val.reps.reduce(function(a, b) {
          return a.weight + b.weight;
        });
      }

      if (!sortedSets.totals.hasOwnProperty(exId)) {
        sortedSets.totals[exId] = {
          name: val.exercise.name,
          totalReps: 0,
          totalWeight: 0
        };
      }

      sortedSets.totals[exId].totalReps += repsSum;
      sortedSets.totals[exId].totalWeight += weightSum;

    });

    return res.json(200, sortedSets);
  });
};

exports.index = function(req, res) {
  Exercise.find({userId: req.user._id})
    .sort({$natural: -1})
    .exec(function(err, exercises) {
      if(err) { return handleError(res, err); }
      return res.json(200, exercises);
    });
};

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
    updated.exercise = req.body.exercise;

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, set);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
