const router = require('express').Router();

const usersRoute = require('./users');
const moviesRoute = require('./movies');
const authRoute = require('./auth');
const authMiddleware = require('../middlewares/auth');
const { NotFound } = require('../errors');

router.use('/', authRoute);
router.use('/users', authMiddleware, usersRoute);
router.use('/movies', authMiddleware, moviesRoute);
router.use('*', authMiddleware, () => {
  throw new NotFound('Страница не найдена');
});

module.exports = router;
