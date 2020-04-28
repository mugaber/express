require('dotenv').config()
require('./config/db')()
const express = require('express')
const cookieParser = require('cookie-parser')

// initlaize the app
const app = express()

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/users', require('./routes/users'))

// serving static files
app.use(express.static(__dirname + '/public'))

// run the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
