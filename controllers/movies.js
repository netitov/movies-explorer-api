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
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
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
    .orFail(new NotFound('Нет фильма с таким id'))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        movie.remove()
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

module.exports = {
  getMovies, createMovie, deleteMovie,
};
