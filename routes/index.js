/**
 * Manages routing for different website pages.
 * This will manage all the different controllers.
 * @Author(s): Daiwei Chen
 * @Version: 2018-11-14
 */

const express = require('express');
const LOG = require('../utils/logger.js');

LOG.debug('Routing all requests...')

const router = express.Router();

// ----------- Top-Level requests -----------------

// 3 log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
//var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
//app.use(logger('dev'));
//app.use(logger('combined', { stream: accessLogStream }));

router.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })

 router.get("/index", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })

 router.get("/products", function (req, res) {
  res.render("products.ejs")
 })

 router.get("/product/index", function (req, res) {
  res.render("product/index.ejs")
 })

 router.get("/order/index", function (req, res) {
  res.render("order/index.ejs")
 })

 router.get("/orderLine/index", function (req, res) {
  res.render("orderLine/index.ejs")
 })

 router.get("/customers/index", function (req, res) { //Did not add these line
  res.render("customers/index.ejs")
 })

 router.get("/about", function (req, res) {
  res.render("aboutus.ejs")
 })

 router.get("/contact", function (req, res) {
  res.render("contactus.ejs")
 })
//  router.get("/404", function (req, res) {
//   res.render("404.ejs")
//  })
 router.get(function (req, res) {
  res.render('404')
})

// ------------------------------------------------

// ------------- Controller pathing ---------------

router.use('/customers', require('../controllers/customers.js')); //Was costomers
router.use('/product', require('../controllers/product.js'))
router.use('/order', require('../controllers/order.js'))
router.use('/orderLine', require('../controllers/orderLine.js'))
// ------------------------------------------------

LOG.debug('Routing end.');
module.exports = router