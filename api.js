const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

async function listProducts(req, res) {
  res.json(await Products.list())
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  if (!product) return next()
  res.json(product)
}

async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

async function editProduct(req, res, next) {
  const product = await Products.update(req.params.id, req.body)
  if (!product) return next()
  res.json(product)
}

async function deleteProduct(req, res, next) {
  const product = await Products.remove(req.params.id)
  if (!product) return next()
  res.json({ success: true })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
})