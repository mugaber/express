const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config() // to be able to use .env shell file

const app = express()
const port = 3000

// connect to mongo database
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  console.log('database connected')
})

// creating an instance using the model
const Person = require('./models/person')
const muhamed = new Person({ name: 'muhamed', age: 23 })

// save to the db
muhamed.save(function(err, data) {
  if (err) return console.error(err)
  console.log('saved to db', data)
})

// creating a lot of instances and saving them
const arrayOfPeople = [
  { name: 'ahmed', age: 20 },
  { name: 'am', age: 30 }
]
Person.create(arrayOfPeople, callback)

// access the data
const callback = function(err, data) {
  if (err) return console.error(err)
  console.log(data)
}

Person.find(callback) // returns array of documents

Person.find({ name: 'muhamed' }, callback) // array of matched docs

// logger
app.get('/', function(req, res, next) {
  console.log(req.method, req.path, req.ip)
  next()
})

// serving static files
app.use(express.static(__dirname + '/public'))

// run the server
app.listen(port, function(req, res) {
  console.log(`Server running on port ${port}`)
})

// tab nine
