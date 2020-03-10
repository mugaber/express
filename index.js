const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// using body-parser for parsing data sent by post in the body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// handle post req with data in the body
// we can ommit next because json ends the loop anyway
app.post('/name', function(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` })
})

//
app.get('/', function(req, res, next) {
  console.log(req.method, req.path, req.ip)
  next()
})

// middleware chaining
app.get(
  '/time',
  function(req, res, next) {
    res.time = new Date().toString()
    next()
  },
  function(req, res) {
    res.json({ time: req.time })
  }
)

// using uri params
app.get('/:word/echo', function(req, res) {
  res.json({ word: req.params.word })
})

// send files
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// serving static files route optional
app.use(express.static(__dirname + '/public'))

// run the server
app.listen(port, function(req, res) {
  console.log(`Server running on port ${port}`)
})
