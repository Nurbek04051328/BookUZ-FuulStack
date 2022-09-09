const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    content: String,
    image: String,
    created: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Book', bookSchema)