/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Exercise = require('../api/exercise/exercise.model');
var Set = require('../api/set/set.model');
var Workout = require('../api/workout/workout.model');
var User = require('../api/user/user.model');

Exercise.find({}).remove(function() {
  console.log('exercises removed');
});
Set.find({}).remove(function() {
  console.log('sets removed');
});
Workout.find({}).remove(function() {
  console.log('workouts removed');
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});