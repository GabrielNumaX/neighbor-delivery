const { Router } = require('express');
const oauth = require('./oauth');

const router = Router();

router.use('/oauth', oauth);

module.exports = router;
