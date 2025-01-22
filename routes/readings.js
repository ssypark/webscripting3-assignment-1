
const express = require('express');
// To use the Router Files, we begin by creating a new constant called readingsRouter and use the express.Router() method to create a new router objects for our readings.
const readingsRouter = express.Router();

// List of readings with initial items
// here, we have an array of objects, each object representing a reading
const readings = [
    { 
        id: 1, 
        title: 'The Vegetarian',
        author: 'Han Kang (Author), Deborah Smith (Translator)',
        imageUrl: './public/thevegetarian.jpg',
        year: 2015
    },
    { 
        id: 2, 
        title: 'Emotional Design: Why We Love (or Hate) Everyday Things',
        author: 'Don Norman',
        imageUrl: './public/emotionaldesign.jpg',
        year: 2005
    },
    { 
        id: 3, 
        title: 'Meditations',
        author: 'Marcus Aurelius (Author), Gregory Hays (Translator)',
        imageUrl: './public/meditations.jpg',
        year: 2003
    },
];

// Here, we will write custom middleware for cleaner code and to avoid repetition
// this function is used to find a book by its id in the array
// req is the request object, res is the response object and these are used to pass data between middleware functions. 
// The next function is used to pass control to the next middleware function in the chain.
function findReadingById(req, res, next) {
    // First, we need to convert the value of the request into a number. This is necessary because the id is a number and the request is a string by default
    // we need to convert the id to a number in order to find the book by its id
    const requestedId = Number(req.params.id);

    // now we need to find the book by its id so we create a variable (readingData) to store the book id via the .find method
    // Use .find method to get the book with the matching id/number in the readings array or to see if it is undefined
    const readingData = readings.find(readingInList => readingInList.id === requestedId);

    // If the book is found and is NOT undefined, send it back as a response
    if (readingData !== undefined) {
        // the response is sent back to the client with the reading data
        // the req object is used to pass data between middleware functions
        req.reading = readingData;
        // the next() function is passed to the middleware to pass control to the next middleware function in the chain
        next();
    // if else(undefined) set the Not Found status and send a message
    } else {
        res.status(404).send('Sorry! Book not found.');
    }
}

// with the findReadingById function, we can now use it for other routes as well

// GETTING A LIST OF READINGS
// We add a GET route to return all the readings in the array in the readingsRouter object
// this route will return all the books in the array by using the .get method
readingsRouter.get('/readings', (req, res) => {
    res.send(readings);
});
// this route will then return a book by its id by using the findReadingById function (see above)
readingsRouter.get('/readings/:id', findReadingById, (req, res) => {
    res.send(req.reading);
});

// ADDING A NEW BOOK
// Now we need the function to add a new book using .post
readingsRouter.post('/readings', (req, res) => {
    const reading = req.body;
    // we need to assign an id to the new book and + 1 to the length of the array
    reading.id = readings.length + 1;
    // we then push the new book to the array
    readings.push(reading);

    // for improved user experience, we respond with a success message and the newly added book
    // a 201 status code is used for items that are created successfully
    res.status(201).send(reading);
});

// DELETING A BOOK
// What if we finished the book or we don't like it? We need to delete it from the list
// Here we will delete a book by its id using a .DELETE request
// the /readings/:id defines the delete route that is is used to delete a book by its id using the findReadingById function (see above)
readingsRouter.delete('/readings/:id', findReadingById, (req, res) => {

    // Convert the id to a number in order to find the book by its id
    const requestedId = Number(req.params.id);

    // Similar to above, we use the array.find method to get the book with the matching id or to see if it is undefined in order to delete it
    const requestedData = readings.find(readingInList => readingInList.id === requestedId);

    // Lets check: If the book is not found, requestedData will be undefined, if it is, we can delete it
    if (requestedData !== undefined) {
        // Find the index of the book in the array and remove it
        // .splice method is used to remove the book from the array by its id. and the 1 indicates that only one book should be removed.
        // The .splice method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
        // the requestedData.id is used to find the book by its id and is the point of the index to start changing the array
        readings.splice(requestedData.id, 1);

        // Respond with a success message with the status code 204 via .send method
        res.status(204).send('Book deleted!');
    } else {
        // If the reading is not found/undefined (404), respond with a message and the the delete method will not be executed.
        res.status(404).send('Book not found.');
    }
});

// UPDATING A BOOK
// What if we want to update the book's text or title?
// We need to update the book by its id using the .put method.
readingsRouter.put('/readings/:id', findReadingById, (req, res) => {
    // to update a book, we need to change the text of the book by using the .put method
    // req.reading.text = req.body.text updates the text property of the book with the new value provided in the request body (req.body.text).
    req.reading.text = req.body.text;
    // this sends the updated book back as a response and confirms that the book update was successful.
    res.send(req.reading);
});

// In order to use the readingsRouter middleware in the app.js file, we need to export it here
module.exports = readingsRouter;