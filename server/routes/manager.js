const express = require('express');

const {
  validateManagerSignUp,
  ValidateLogin,
} = require('../validation/validation');
const Manager = require('../models/Manager');
const createToken = require('../middleware/createToken');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateManagerSignUp(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // checks, if email already exists
    const manager = await Manager.findOne({ email: req.body.email });

    if (manager) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const { firstname, lastname, email, password, dob, address, company } =
      req.body;

    // Save manager details
    const user = await Manager.create({
      firstname,
      lastname,
      email,
      password,
      dob,
      address,
      company,
    });

    const accessToken = createToken(user);

    return res.status(201).json({ success: true, accessToken });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = ValidateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    // checks, if email exists or not?
    const user = await Manager.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        email: 'Unable to find user with that email address',
      });
    }

    if (await user.isValidPassword(password)) {
      const accessToken = createToken(user);

      return res.status(200).json({ success: true, accessToken });
    } else {
      return res
        .status(400)
        .json({ success: false, password: 'Password is incorrect' });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

module.exports = router;
