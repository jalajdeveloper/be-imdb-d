const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year_of_release: {
        type: Date,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    actors: [{ type: mongoose.Types.ObjectId, ref: 'Actor', required: true }],
    producer: { type: mongoose.Types.ObjectId, ref: 'Producer', required: true }
});

const Movie = mongoose.model('Movie', movieSchema, 'movie');

module.exports = Movie;
