const mongoose = require('mongoose')
const Schmea = mongoose.Schema

// definning the shcmea
const PersonSchmea = new Schmea({
  name: { type: String, required: true },
  age: { type: Number, required: true }
})

// exporting the model
module.exports = mongoose.model('person', PersonSchmea)
