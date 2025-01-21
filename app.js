const express = require('express');
const app = express();
const PORT = 3000;
const readingsRouter = require('./routes/readings');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', readingsRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});