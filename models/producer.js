const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const producerchema = new Schema({
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

const Producer = mongoose.model('Producer', producerchema, 'producer');

module.exports = Producer;
