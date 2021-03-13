const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const registerValidator = require('../middlewares/validators/register');
const loginValidator = require('../middlewares/validators/login');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);

module.exports = router;
