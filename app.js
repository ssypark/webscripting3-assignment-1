// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Set the port to 3001
const PORT = 3001;

// Here, we are importing the readingsRouter from the routes/readings.js file
const readingsRouter = require('./routes/readings');
// the bodyParser module is used to parse incoming requests as a middleware
const bodyParser = require('body-parser');

// the middleware parses JSON request bodies
app.use(bodyParser.json());

// the readingsRouter is used to handle requests and will be prefixed with /api eg. api/readings/3
app.use('/api', readingsRouter);

// This starts the server on the specified port (ie. 3001)
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});