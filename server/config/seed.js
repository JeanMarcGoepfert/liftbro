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
  }, function(err, res) {
      console.log('finished populating users');
      Exercise.create({
          userId: res._id,
          name: 'Benchpress',
          metric: 'Kg'
      }, function() {
        console.log('Benchpress created')
      });
      Exercise.create({
        userId: res._id,
        name: 'Curl',
        metric: 'Kg'
      }, function() {
        console.log('Curl created')
      });
      Exercise.create({
        userId: res._id,
        name: 'Legpress',
        metric: 'Kg'
      }, function() {
        console.log('Legpress created')
      });
    }
  );
});
