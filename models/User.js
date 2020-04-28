const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, max: 30 },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', UserSchema)
