const router = require('express').Router();

const usersRoute = require('./users');
const moviesRoute = require('./movies');
const authMiddleware = require('../middlewares/auth');

router.use('/users', authMiddleware, usersRoute);
router.use('/movies', authMiddleware, moviesRoute);

module.exports = router;
