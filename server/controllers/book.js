const Book = require("../models/book");
const { post } = require("../routes/routes");
const fs = require('fs');

module.exports = class BOOK {

    // fetch all books
    static async fetchAllBook(req, res) {
        try {
            const books = await Book.find();
            res.status(200).json(books)
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };

    // fetch book by ID
    static async fetchBookBYID(req, res) {
        const id = req.params.id;
        try {
            const post = await Book.findById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };

    // create book
    static async createBook(req, res) {
        const book = req.body;
        const imagename = req.file.filename;
        book.image = imagename;
        try {
            await Book.create(book);
            res.status(201).json({ message: 'Book created successfully!'})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // update a book
    static async updateBook(req, res) {
        const id = req.params.id;
        let new_image = '';
        if(req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image)
            } catch (error) {
                console.log(error);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newBook = req.body;
        newBook.image = new_image;

        try {
            await Book.findByIdAndUpdate(id, newBook);
            res.status(200).json({ message: "Book updated succesfully! "})
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };

    // delete a book
    static async deleteBook(req, res) {
        const id = req.params.id;
        try {
            const result = await Book.findByIdAndDelete(id);
            if(result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image)
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({message: "Book deleted succesfully! "});
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    };
}