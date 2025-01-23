const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/postRoutes')

const app = express()

// Middleware to parse JSON data
app.use(express.json())

// Use the postRoutes
app.use('/api/posts', postRoutes)

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Database connection error:', error)
    })