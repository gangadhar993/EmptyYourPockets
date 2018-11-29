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
    type: String,
    required:true,
    default: ""
  }, 
  _productid: { type: Number, required: true }, 
  _customerid: {
    type: Number,
    required: true,
  }, 
  totalAmount: {
    type: Number,
    required: true,
    default:0.0
  }
})
module.exports = mongoose.model('Order', OrderSchema)
