'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SetSchema = new Schema({
    userId: {type: String, required: true},
    exerciseId: {type: String, required: true},
    exerciseName: {type: String, required: true},
    exerciseMetric: {type: String, required: true},
    reps: [
      {
        weight: Number,
        amount: Number
      }
    ]
});

module.exports = mongoose.model('Set', SetSchema);