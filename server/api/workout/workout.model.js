'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
    userId: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    sets: [
      { _id: String }
    ]
});

module.exports = mongoose.model('Workout', WorkoutSchema);