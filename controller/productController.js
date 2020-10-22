const Product = require('../model/productModel')
const { getPostData } = require('../utils')

// @desc Get All Products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

// @desc Get Single Product
// @route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id)
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ msg: 'Product not found' }))
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc Create A Product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req)
    const { title, description, price } = JSON.parse(body)
    const product = {
      title,
      description,
      price,
    }
    const newProduct = await Product.create(product)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

// @desc Update A Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id)
    if (product) {
      const body = await getPostData(req)
      const { title, description, price } = JSON.parse(body)
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      }
      const updProduct = await Product.update(id, productData)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updProduct))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ msg: 'Product not found' }))
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc Delete A Product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id)
    if (product) {
      await Product.remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ msg: `Product ${id} removed` }))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ msg: 'Product not found' }))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
