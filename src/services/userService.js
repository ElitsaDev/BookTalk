const User = require('../models/User');

exports.findById = (userId) => User.findById(userId);
exports.addbooks = async (userId, bookId) => {
    // User.updateOne({_id: userId}, {$push: {bookId}}); - native query
    const user = await User.findById(userId);
    user.books.push(bookId);

    await user.save();
    return user;
} 