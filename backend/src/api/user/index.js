const { Router } = require('express');
const controllers = require('./controllers');

const router = Router();

router.get('/me', controllers.fetchMe);
router.get('/:id', controllers.fetchById);

module.exports = router;
