const express = require('express');
const producer = require('../controllers/producerController');

const api = express.Router();

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

api.get('/api/producer/getAll', use(producer.getAll));

api.post('/api/producer/add', use(producer.add));

api.put('/api/producer/update/:id', use(producer.update));

api.delete('/api/producer/delete/:id', use(producer.delete));

module.exports = api;
