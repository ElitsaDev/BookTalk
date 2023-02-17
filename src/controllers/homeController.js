const router = require('express').Router();
const bookService = require('../services/bookService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    res.render('home/index');
});

router.get('/profile', async(req, res) => {
    const userId = req.user._id;
    const user = await userService.findById(userId).populate('wishes').lean();
    const wishedBooks = await bookService.getMyWishBook(userId);    
 
    res.render('home/profile', {user, wishedBooks});
})

module.exports = router;