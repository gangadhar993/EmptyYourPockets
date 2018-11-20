/**
 * Order schema to store all order details by using mongoose 
 * @author Kolli, Pradeep
 */
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  _orderid: { 
    type: Number, 
    required: true 
    },
  orderDate: {
    type: Date,
    required:true,
    default: Date.now
  }, 
  _productid: { type: Number, required: true }, 
  _customerid: {
    type: String,
    required: true,
  }, 
  totalAmount: {
    type: Number,
    required: true,
    default:0.0
  }
})
module.exports = mongoose.model('Order', OrderSchema)
