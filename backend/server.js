require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoute = require('./routes/postRoute')
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute');
const profileRoute = require('./routes/profileRoute');
const verifyToken = require('./middleware/verifyToken');

const app = express()

// Middleware to parse JSON data
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Use the routes
app.use('/api/posts', postRoute)
app.use('/api/register', registerRoute)
app.use('/api/login', loginRoute)
app.use('/api/profile', profileRoute)
app.use('/uploads', express.static('uploads'));
app.get('/api/newsfeed', verifyToken, (req, res) => {
    res.json({ message: 'Protected newsfeed content', user: req.user });
});

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