'use strict';

var express = require('express');
var controller = require('./workout.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/count', auth.isAuthenticated(), controller.count);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);

module.exports = router;