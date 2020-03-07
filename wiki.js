const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('wiki home page')
})

router.get('/about', (req, res) => {
  res.send('wiki about page')
})

// using routes will bundle middlewares together
// and then used to specific route

module.exports = router
