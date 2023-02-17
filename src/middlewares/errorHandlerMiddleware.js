exports.errorHandler = (err, req, res, next) => {
    res.render('home/404');
}