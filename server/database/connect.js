const mongoose = require('mongoose');

async function connect({ db }) {
  try {
    await mongoose
      .connect(db)
      .then(() => console.log('Successfully connected to Database'));
  } catch (error) {
    console.log('An error ocurred when trying to connect with Database');
    throw error;
  }
}

module.exports = connect;
