const express = require('express')
const { leadSubmitForm } = require('../controllers/leadController');
const { addProductInfo } = require('../controllers/productInfoController');

const leadRoute = express.Router();

leadRoute.post('/:type/:subType', leadSubmitForm) 

module.exports = leadRoute