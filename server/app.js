// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5040;

// middlewars
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to the database!"))
.catch((error) => console.log(error));

// routes
app.use('/api/book', require('./routes/routes'));

// start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));