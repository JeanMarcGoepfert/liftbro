'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    metric: {type: String, required: true}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);