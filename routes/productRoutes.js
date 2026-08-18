const express = require('express');
const productController = require('../controllers/productContoller');

const route = express.Router();

route.get('/', productController.list);
route.get('/new', productController.newForm);
route.post('/', productController.create);
route.get('/:id', productController.show);
route.get('/:id/edit', productController.editForm);
route.post('/:id/edit', productController.update);
route.post('/:id/delete', productController.delete);


module.exports = route;