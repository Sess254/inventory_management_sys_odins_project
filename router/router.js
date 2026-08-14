const express = require('express');
const inventoryController = require('../contoller/inventoryController');


const router = express.Router();

router.get('/', inventoryController.getHome);
router.get('/categories', inventoryController.getCategories);
router.get('/products', inventoryController.getProducts);


module.exports = router;