const express = require('express')
const app = express()

const port = 3000

// will be called to all request
app.all('/secret', (req, res, next) => {
  res.send('accessing secret route')
  next() // passing the control to the next middleware
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log('Server Running on port ' + port)
})
