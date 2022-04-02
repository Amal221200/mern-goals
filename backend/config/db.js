require('dotenv').config()
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI


const dbConnect = () => {
    mongoose.connect(URI, () => {
        console.log('Connected to database'.underline)
    })
}

module.exports = dbConnect