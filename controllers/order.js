/**
 * Controller for the Orders page
 * @author Kolli, Pradeep
 */
const express = require('express')
const api = express.Router()
const Model = require('../models/order.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'order'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.orders.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orders.query
  const item = find(data, { _orderid: id })
  if (!item) { return res.end(notfoundstring) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('order/index.ejs')
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create${req}`)
  const item = new Model()
  LOG.debug(JSON.stringify(item))
  res.render('order/create',
    {
      title: 'Create orders',
      layout: 'layout.ejs',
      order: item
    })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orders.query
  const item = find(data, { _orderid: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('order/delete.ejs',
    {
      title: 'Delete orders',
      layout: 'layout.ejs',
      orders: item
    })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id) // base 10
  const data = req.app.locals.orders.query
  const item = find(data, { _orderid: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('order/details.ejs',
    {
      title: 'order Details',
      layout: 'layout.ejs',
      orders: item
    })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orders.query
  const item = find(data, { _orderid: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('order/edit.ejs',
    {
      title: 'orders',
      layout: 'layout.ejs',
      order: item
    })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.orders.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._orderid}`)
  item._orderid = parseInt(req.body._orderid, 10) // base 10
  item.orderDate = req.body.orderDate
  item._productid = req.body._productid
  item._customerid = req.body._customerid
  item.totalAmount = req.body.totalAmount

    data.push(item)
    LOG.info(`SAVING NEW ORDER ${JSON.stringify(item)}`)
    return res.redirect('/order')
  }
)

// POST update
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling SAVING ID=${id}`)
  const data = req.app.locals.orders.query
  const item = find(data, { _orderid: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
  LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)// base 10
  item.orderDate = req.body.orderDate
  item._productid = req.body._productid
  item._customerid = req.body._customerid
  item.totalAmount = req.body.totalAmount
  LOG.info(`SAVING UPDATED ORDER ${JSON.stringify(item)}`)
  return res.redirect('/order')
  
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.orders.query
  const item = find(data, { _orderid: id })
  if (!item) {
    return res.end(notfoundstring)
  }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _orderid: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/order')
})

module.exports = api
