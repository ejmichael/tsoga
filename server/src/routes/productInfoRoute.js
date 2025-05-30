const express = require('express')
const { addProductInfo } = require('../controllers/productInfoController')

const productInfoRoute = express.Router()

productInfoRoute.post('/add-product', addProductInfo)

module.exports = productInfoRoute