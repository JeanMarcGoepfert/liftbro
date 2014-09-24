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
var Set = require('./set.model');

// Creates a new set in the DB.
exports.create = function(req, res) {
  var set = new Set(req.body);
  set.userId = req.user._id;

  Set.create(set, function(err, set) {
    if(err) { return handleError(res, err); }
    return res.json(201, set);
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
    updated.exerciseName = req.body.exerciseName;
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