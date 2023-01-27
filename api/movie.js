const express = require('express');
const movie = require('../controllers/movieController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const api = express.Router();

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

api.get('/api/movie/getAll', use(movie.getAll));

api.post('/api/movie/add', upload.single('poster'), use(movie.add));

api.put('/api/movie/update/:id', use(movie.update));

api.delete('/api/movie/delete/:id', movie.delete);

module.exports = api;
