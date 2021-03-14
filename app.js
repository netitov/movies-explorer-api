const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
/* const path = require('path'); */
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { NotFound } = require('./errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// для теста
/* app.use((req, res, next) => {
  req.user = {
    _id: '604ca377f6f16d0a6ca631b8',
  };

  next();
}); */


app.use('/', router);
/* app.use(express.static(path.join(__dirname, '../frontend/build'))); */

app.use(errorLogger);

app.use(() => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
