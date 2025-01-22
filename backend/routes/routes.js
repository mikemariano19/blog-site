const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
  })
  
  // POST method route
  app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  })