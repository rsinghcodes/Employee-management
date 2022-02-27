const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connect = require('./database/connect');
const manager = require('./routes/manager');
const employee = require('./routes/employee');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/manager', manager);
app.use('/api/employee', employee);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
  await connect({ db: process.env.MONOGODB_URI });
});
