var router = require('express').Router();

//route to v1 index.js. More API versions could be added to this file as the API develops.
router.use('/v1', require('./v1'));

module.exports = router;