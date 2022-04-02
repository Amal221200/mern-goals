const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const { createUser, logUser, getUserDetails } = require('../controllers/userController')
const fetchUser = require('../middleware/fetchUser');

router.post('/signup', [body('name', 'Minimum 5 character').notEmpty(), body('email', 'Enter a valid email').isEmail(), body('password', 'Minimum 8 character').isLength({ min: 3 })], createUser)

router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'Minimum 8 character').exists()], logUser)

router.post('/getuser', fetchUser, getUserDetails)

module.exports = router