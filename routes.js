const SampleController = require('./src/controllers/SampleController');
const express = require('express');
const routes = new express.Router();

routes.post('/sample',SampleController.insertSample);
routes.get('/sample',SampleController.getAll)
routes.get('/samplelast',SampleController.getLast)

module.exports = routes;