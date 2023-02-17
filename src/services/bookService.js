const Book = require('../models/Book');

exports.getAll = () => Book.find().lean();

exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.getOneNotLean = (bookId) => Book.findById(bookId);

exports.getOneDetails = (bookId) => Book.findById(bookId).populate('wishingList').lean();

exports.getMyWishBook = (userId) => Book.find({ wishingList: userId}).lean();

exports.update = (bookId, bookData) => 
        Book.findByIdAndUpdate(bookId, bookData, {runValidators: true}).lean();

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.create = (bookData) => Book.create(bookData);  






