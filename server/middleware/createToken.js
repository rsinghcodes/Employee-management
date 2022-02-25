const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });
};

module.exports = createToken;
