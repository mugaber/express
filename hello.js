const express = require('express')
const app = express()
const wiki = require('./wiki')
const port = 3000

// serving static files from the public folder
app.use(express.static('public'))

// using another file
app.use(express.static('media'))

app.get('/', (req, res) => {
  res.send('home page')
})

app.use('/wiki', wiki)

app.listen(port, () => {
  console.log('Server Running on port ' + port)
})
