const { Router } = require('express');
const auth = require('./auth');
const oauth = require('./oauth');
const user = require('./user');

const router = Router();

router.use('/oauth', oauth);
router.use('/user', auth, user);

module.exports = router;
