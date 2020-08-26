const express = require('express');
const bodyParser = require('body-parser');

const prescription = express.Router();
const asyncHandler = require('express-async-handler');
const opportunityController = require('../controller/prescription');

prescription.use(bodyParser.json());
prescription.use(bodyParser.urlencoded({ extended: false }));

// save prescription
prescription.post('/save-prescription', asyncHandler((req, res) => opportunityController.saveAPrescription(req, res)));

// delete prescription
prescription.delete('/prescription/:id', asyncHandler((req, res) => opportunityController.deleteAPrescription(req, res)));

// verify drug completion
prescription.get('/verify', asyncHandler((req, res) => opportunityController.verifyDrugCompletion(req, res)));

module.exports = prescription;
