/**
 * Product schema to store all customer details by using mongoose 
 * @author Daiwei Chen
 */
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    default: 'Steve'
  },
  premium: {
    type: Boolean,
    required: true,
    default: false
  },
  wallet: { 
    type: Number,
    required: true,
    default: 0.0
  },
})
module.exports = mongoose.model('Customer', CustomerSchema)