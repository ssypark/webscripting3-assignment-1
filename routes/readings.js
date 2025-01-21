// body-parser is a middleware that parses incoming request bodies 
const { text } = require('body-parser');
const express = require('express');
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
        title: 'Book 3',
        author: 'Marcus Aurelius (Author), Gregory Hays (Translator)',
        imageUrl: './public/medtitations.jpg',
        year: 2003
    },
];

// this function is used to find a book by its id
function findReadingById(req, res, next) {
    // First, we need to convert the value to a number
    const requestedId = Number(req.params.id);

    // Use Array.find to get the reading with the matching id/number or undefined
    const readingData = readings.find(readingInList => readingInList.id === requestedId);

    // If the reading is found, send it back as a response
    if (readingData !== undefined) {
        req.reading = readingData;
        next();
    // Else set the Not Found status and send a message
    } else {
        res.status(404).send('Book not found. Go touch some grass.');
    }

}
// GETTING A LIST OF READINGS
// Get all readings
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
// Here we will delete a book by its id using a DELETE request
readingsRouter.delete('/readings/:id', findReadingById, (req, res) => {
    // Convert the id to a number
    const requestedId = Number(req.params.id);

    // Use the .find method to get the reading with the matching id or undefined
    const requestedData = readings.find(readingInList => readingInList.id === requestedId);

    // If the reading is not found, requestedData will be undefined
    if (requestedData !== undefined) {
        // Find the index of the reading in the array and remove it
        // .splice method is used to remove the book from the array by its id. 1 is used to remove only one book
        readings.splice(requestedData.id, 1);

        // Respond with a success message with the status code 204 via .send method
        res.status(204).send('Book deleted');
    } else {
        // If the reading is not found (404), respond with a message
        res.status(404).send('Book not found. Go touch some grass.');
    }
}