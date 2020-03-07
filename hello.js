const express = require('express')
const app = express()
const wiki = require('./wiki')
const port = 3000

// an example middleware
const nextMiddlewre = (req, res, next) => {
  next()
}

// with out the route, apply to all
app.use(nextMiddlewre)

// any method, sp route
app.use('/wiki/', nextMiddlewre)

// specific method, sp route
app.get('/', nextMiddlewre)

app.get('/', (req, res) => {
  res.send('home page')
})

app.use('/wiki', wiki)

app.listen(port, () => {
  console.log('Server Running on port ' + port)
})
