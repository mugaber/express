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

// handling errors middleware have extra argument at the start err
// err handlers should be the last middlewares to catch all errors
// there is built in error handling but does not include 404, ...
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(port, () => {
  console.log('Server Running on port ' + port)
})
