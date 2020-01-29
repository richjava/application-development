var router = require('express').Router();

//all requests beginning with "/articles" will be handled by articles.js
router.use('/articles', require('./articles'));
//Entity relationships s5: Add new route for users
router.use('/users', require('./users'));

module.exports = router;