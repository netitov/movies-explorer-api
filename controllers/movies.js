const Movie = require('../models/movie');
const {
  Forbidden, NotFound, BadRequest,
} = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Введены некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFound('Нет карточки с таким id'))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((delmovie) => res.send({ delmovie }))
          .catch(next);
      } else {
        throw new Forbidden('Нет доступа');
      }
    })
    .catch((err) => {
      throw err;
    })
    .catch(next);
};

/* const setLike = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Нет карточки с таким id');
      }
      res.send(movie);
    })
    .catch((err) => {
      throw err;
    })
    .catch((err) => {
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Нет карточки с таким id');
      }
      res.send(movie);
    })
    .catch((err) => {
      throw err;
    })
    .catch((err) => {
      next(err);
    });
};
 */

module.exports = {
  getMovies, createMovie, deleteMovie
};
