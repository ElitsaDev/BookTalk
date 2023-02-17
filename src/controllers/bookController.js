const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');
const userService = require('../services/userService');

router.get('/create', isAuthorized, (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const bookData = {...req.body, owner: req.user._id};

    try{
        await bookService.create(bookData);
        res.redirect('/books/catalog');
    }catch(error){
        return res.render('book/create', { ...req.body, error: getErrorMessage(error) }); 
    } 
});

router.get('/catalog', async (req, res) => {
    try {
        const books = await bookService.getAll();
        
        res.render('book/catalog', { books });
    } catch (error) {
        return res.status(404).render('home/404', { error: getErrorMessage(error) });
    }
});

router.get('/:bookId/details', async (req, res) => {
    const book = await bookService.getOneDetails(req.params.bookId);

    const isAuthor = book.owner?._id == req.user?._id;
    
    const isWished = book.wishingList.filter(x => x._id ==req.user?._id);
      
    res.render('book/details', {...book, isAuthor, isWished});
});

router.get('/:bookId/edit', async (req, res) => {
    const book = await bookService.getOne(req.params.bookId);
    const isAuthor = book.owner == req.user?._id;
    if(!isAuthor){
        return res.status(401).render('home/404', { error: 'You are not authorized' });
    }
    res.render('book/edit', {...book, isAuthor});
});

router.post('/:bookId/edit', async (req, res) => {
    try{
        await bookService.update(req.params.bookId, req.body)
        res.redirect(`/books/${req.params.bookId}/details`);
    }catch(error){
        res.render('book/edit', {...req.body, error: getErrorMessage(error)})
    }  
});

router.get('/:bookId/delete', async (req, res) => {
    const book = await bookService.delete(req.params.bookId);
    res.redirect('/books/catalog');
});

router.get('/:bookId/wish', isAuthorized, async (req, res) => {
    const book = await bookService.getOneNotLean(req.params.bookId);
    const user = await userService.findById(req.user._id);
    book.wishingList.push(req.user._id);
    user.wishes.push(book);

    await book.save()
    res.redirect(`/books/${req.params.bookId}/details`);
});

module.exports = router;