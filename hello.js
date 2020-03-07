const express = require('express')
const app = express()
const wiki = require('./wiki')
const port = 3000

app.get('/', (req, res) => {
  res.send('home page')
})

app.use('/wiki', wiki)

app.listen(port, () => {
  console.log('Server Running on port ' + port)
})
