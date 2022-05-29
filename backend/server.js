require('dotenv').config()
const express = require('express');
const path = require('path');
const colors = require('colors');
// const cors = require('cors');
const dbConnect = require('./config/db')
const app = express()

// app.use(cors())
dbConnect()

const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})