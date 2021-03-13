const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const idValidator = require('../middlewares/validators/id');
const createCardValidator = require('../middlewares/validators/createCard');

router.get('/', getMovies);
router.post('/', /* createCardValidator, */ createMovie);
router.delete('/:movieId', /* idValidator, */ deleteMovie);
/* router.put('/:cardId/likes', idValidator, setLike);
router.delete('/:cardId/likes', idValidator, deleteLike); */

module.exports = router;
