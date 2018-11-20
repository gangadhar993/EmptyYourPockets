/**
 * Product schema to store all product details by using mongoose 
 * @author Adusumalli, Gangadhar
 */
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _productid: { type: Number, required: true },
  productName: {
    type: String,
    required: true,
    default: 'Iphone'
  }, 
  productDescription: {
    type: String,
    required: true,
    default: 'Mobile'
  }, 
  price: {
    type: Number,
    required: false,
    default:600
  },
  productCategory: { 
    type: String,
    required: true,
    default: 'Electronic'
  },
  sellerId: { 
    type: Number,
    required: true,
  }
})
module.exports = mongoose.model('Product', ProductSchema)