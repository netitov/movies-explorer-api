const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./utils/limiter');
const mongo = require('./utils/config');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
