const router = require('express').Router();
const { isAuthorized, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const authService = require('../services/authService')

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword, email } = req.body;

    if (password !== repeatPassword) {
        return res.render('auth/register', { error: 'Password missmatch' });
    }

    try {
        const token = await authService.register(username, password, repeatPassword, email);
        console.log(token);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        return res.status(401).render('auth/register', { error: getErrorMessage(error) });
    }

    console.log(req.body)
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/logout', isAuthorized, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;