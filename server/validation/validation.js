const Validator = require('validator');
const isEmpty = require('is-empty');

// validation before SignUp

function validateManagerSignUp(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.dob = !isEmpty(data.dob) ? data.dob : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.company = !isEmpty(data.company) ? data.company : '';

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Firstname field is required';
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.dob)) {
    errors.dob = 'Please enter DOB';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Please enter Address';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Please enter Company details';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

// validation before login
function ValidateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : ''; // Email checks
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = { validateManagerSignUp, ValidateLogin };
