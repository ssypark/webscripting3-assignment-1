const { text } = require('body-parser');
const express = require('express');
const readingsRouter = express.Router();

// List of readings with initial items
const readings = [
    { id: 1, text: 'Readings 1' },
];