const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return regex.test(v);
      },
      message: 'Invalid image link',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return regex.test(v);
      },
      message: 'Invalid trailer link',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return regex.test(v);
      },
      message: 'Invalid thumbnail link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'movie',
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /[а-я\sё]/;
        return regex.test(v);
      },
      message: 'Cyrillic letters only',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /[a-z]/;
        return regex.test(v);
      },
      message: 'Latin letters only',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
