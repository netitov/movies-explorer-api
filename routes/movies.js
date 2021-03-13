const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const idValidator = require('../middlewares/validators/id');
const createMovieValidator = require('../middlewares/validators/createMovie');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', idValidator, deleteMovie);

module.exports = router;
