const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        required: (true, 'Title is required'),
    },
    author: {
        type: String,
        minLength: 5,
        required: (true, 'Author is required'),
    },
    image: {
        type: String,
        validate: /^https?:\/\//i,
        required: (true, 'Image is required'),
    },
    bookReview: {
        type: String,
        minLength: 10,
        required: (true, 'Book Review is required'),
    },
    genre: {
        type: String,
        minLength: 3,
        required: (true, 'Genre is required'),
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: (true, 'Stars is required'),
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;