// Import the Express module after installation
const express = require('express');

// Create an Express application in order to use the Express module
const app = express();

// Set the port to 3001 for the server so that it can listen for requests
const PORT = 3001;

// MIDDLEWARE
// app.use() is used to mount the specified middleware function(s) at the path which is being specified
// To use images in the public folder we need to use the express.static middleware
// static middleware is used to serve static files such as images, CSS files, and JavaScript files
app.use(express.static('public'));

// Here, we are importing the readingsRouter from the routes/readings.js file via the require() function
// routing is a mechanism that determines how an application responds to a client request to a particular endpoint
const readingsRouter = require('./routes/readings');

// BODYPARSER MIDDLEWARE
// the bodyParser module is used to parse incoming requests as a middleware
const bodyParser = require('body-parser');
// the middleware parses JSON request bodies
app.use(bodyParser.json());

// the readingsRouter is used to handle requests and will be prefixed with /api eg. api/readings/3
app.use('/api', readingsRouter);

// app.listen method starts the server on the specified port (ie. 3001 for development)
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});