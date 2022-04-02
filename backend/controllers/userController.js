require('dotenv').config()
const { validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const SECRET_KEY = process.env.KEY

// @desc Create user
// route POST /api/users/signup
// access Public
const createUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) { return res.status(400).json({ message: 'A user with this email already exits' }) }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: secPass
    })

    if (user) {

        const authToken = generateToken(user.id)
        return res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: authToken })
    }
})

// @desc Log user
// route POST /api/users/login
// access Public
const logUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: 'Please enter the correct credentials' })
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
        return res.status(400).json({ message: 'Please enter the correct credentials' })
    }

    const authToken = generateToken(user.id)
    return res.status(200).json({ _id: user.id, name: user.name, email: user.email, token: authToken })
})

// @desc Get user details
// route POST /api/users/getuser
// access Private
const getUserDetails = asyncHandler(async (req, res) => {
    const id = req.user.id
    const user = await User.findById({ _id: id }).select('-password')
    return res.status(200).json({ user })
})

// Generating JWT
const generateToken = (id) => {
    const data = {
        user: {
            id
        }
    }

    return jwt.sign(data, SECRET_KEY, {
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    logUser,
    getUserDetails
}