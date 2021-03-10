  
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const user = require('./user.routes');


router.use('/user', user);

module.exports = router;