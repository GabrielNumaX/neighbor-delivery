const { Router } = require('express');
const controllers = require('./controllers');

const router = Router();

router.get('/', controllers.auth);
router.get('/callback', controllers.callback);

module.exports = router;
