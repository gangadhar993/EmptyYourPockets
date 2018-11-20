// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')
const products = require('../data/products.json')
const orders = require('../data/orders.json')
const customers = require('../data/customers.json')
const orderLine = require('../data/orderLine.json')

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = {}

  db.products = new Datastore()
  db.products.loadDatabase()

  // insert the sample data into our data store
  db.products.insert(products)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.products = db.products.find(products)
  LOG.debug(`${app.locals.products.query.length} products seeded`)

  //creating order datastore
  db.orders = new Datastore()
  db.orders.loadDatabase()

  // insert the sample data into our data store
  db.orders.insert(orders)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.orders = db.orders.find(orders)
  LOG.debug(`${app.locals.orders.query.length} orders seeded`)

  // Creating customer datastore
  db.customers = new Datastore()
  db.customers.loadDatabase()

  // Insert customer data
  db.customers.insert(customers)

  // initialize app.locals, count customers
  app.locals.customers = db.customers.find(customers)
  LOG.debug(`${app.locals.customers.query.length} customers seeded`)
  
  //creating orderLine datastore
  db.orderLine = new Datastore()
  db.orderLine.loadDatabase()

  //Insert orderLine data
  db.orderLine.insert(orderLine)

  //  initialize app.locals
  app.locals.orderLine = db.orderLine.find(orderLine)
  LOG.debug(`${app.locals.orderLine.query.length} Order Line seeded`)

  LOG.info('END Seeder. Sample data read and verified.');


}