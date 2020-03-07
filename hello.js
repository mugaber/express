const express = require('express')
const app = express()
const wiki = require('./wiki')
const port = 3000

app.use(express.static('public'))
app.use(express.static('media'))
app.use('/wiki', wiki)

app.get('/', (req, res) => {
  res.send('home page')
})

// connecting to mongodb
const mongodbClient = require('mongodb').MongoClient

mongodbClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  if (err) throw err

  const db = client.db()

  db.collection('users')
    .find()
    .toArray((err, res) => {
      if (err) throw err

      console.log(res)
      client.close()
    })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(port, () => {
  console.log('Server Running on port ' + port)
})
