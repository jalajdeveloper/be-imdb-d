const express = require('express');
const actor = require('../controllers/actorController');

const api = express.Router();

//error handling
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

api.get('/api/actor/getAll', use(actor.getAll));

api.post('/api/actor/add', use(actor.add));

api.put('/api/actor/update/:id', use(actor.update));

api.delete('/api/actor/delete/:id', use(actor.delete));

module.exports = api;
