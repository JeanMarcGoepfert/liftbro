'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SetSchema = new Schema({
    userId: {type: String, required: true},
    workoutId: {type: String, required: true},
    exercise: {},
    reps: [
      {
        weight: Number,
        amount: Number
      }
    ]
});

module.exports = mongoose.model('Set', SetSchema);