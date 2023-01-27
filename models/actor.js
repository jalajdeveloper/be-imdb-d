const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }]
});

const Actor = mongoose.model('Actor', actorSchema, 'actor');

module.exports = Actor;
