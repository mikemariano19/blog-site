require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const postRoutes = require('./routes/postRoute')
const registerRoutes = require('./routes/registerRoute')

const app = express()

// Middleware to parse JSON data
app.use(express.json())
app.use(cors())

// Use the routes
app.use('/api/posts', postRoutes)
app.use('/api/register', registerRoutes)

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error('Database connection error:', error)
    })