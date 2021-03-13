const router = require('express').Router();
const {
  updateUser, getUserMe,
} = require('../controllers/users');
const updateUserValidator = require('../middlewares/validators/updateUser');

router.get('/me', getUserMe);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
