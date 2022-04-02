require('dotenv').config()
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.KEY

const fethUser = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            // console.log(token)
            const data = jwt.verify(token, SECRET_KEY)
            req.user = data.user
            next()
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
}

module.exports = fethUser