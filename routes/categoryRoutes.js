const express = require('express');
const categoryController = require('../controllers/categoryController');

const route = express.Router();

route.get('/', categoryController.list);
route.get('/new', categoryController.newForm);
route.post('/', categoryController.create);
route.get('/:id', categoryController.show);
route.get('/:id/edit', categoryController.editForm);
route.post('/:id/edit', categoryController.update);
route.post('/:id/delete', categoryController.delete);

module.exports = route;