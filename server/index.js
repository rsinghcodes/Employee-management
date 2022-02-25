const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connect = require('./database/connect');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/manager');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
  await connect({ db: process.env.MONOGODB_URI });
});
