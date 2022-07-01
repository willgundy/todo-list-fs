const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch(e) {
      next(e);
    }
  })
  
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch(e) {
      next(e);
    }
  })
  
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      res.json(updatedItem);
    } catch(e) {
      next(e);
    }
  })
  
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const deletedItem = await Item.delete(req.params.id);
      res.json(deletedItem);
    } catch(e) {
      next(e);
    }
  });
