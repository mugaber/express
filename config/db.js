const mongoose = require('mongoose')

module.exports = function () {
  try {
    mongoose
      .connect(process.env.DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('DB connected'))
      .catch(err => console.log('DB connection error', err))

    //
  } catch (err) {
    console.error('Error establishing connection to DB', err)
    process.exit(1)
  }
}
