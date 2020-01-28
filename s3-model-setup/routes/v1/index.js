var router = require('express').Router();

//all requests beginning with "/articles" will be handled by articles.js
router.use('/articles', require('./articles'));
//more routes can be added here in the same way...

module.exports = router;