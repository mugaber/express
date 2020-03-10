const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()

// initlaize the app
const app = express()
const port = 3000

// connect to db
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// get connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  console.log('database connected')
})

// query db
const Person = require('./models/person')

const asyncQueries = async function() {
  console.log('running async db call')
  let id = ''

  await Person.find(function(err, data) {
    if (err) return console.error(err)
    id = data[0]._id
    console.log('Person documents \n', data)
  })

  await Person.findById(id, function(err, data) {
    if (err) console.error(err)
    data.name = 'muhamed'
    data.save(function(err, data) {
      if (err) console.error(err)
      console.log('saved doc', data)
    })
  })

  await Person.findOneAndUpdate(
    { name: 'muhamed' },
    { name: 'muhammed' },
    { new: true, useFindAndModify: false },
    (err, data) => console.log('find one and update', data)
  )

  // query chaining, because there is no callback we can call exec
  await Person.find()
    .select('-favoriteFoods')
    .sort({ name: 'asc' })
    .limit(2)
    .exec(function(err, data) {
      if (err) return console.error(err)
      console.log(data)
    })
}

asyncQueries()

// serving static files
app.use(express.static(__dirname + '/public'))

// run the server
app.listen(port, function(req, res) {
  console.log(`Server running on port ${port}`)
})
