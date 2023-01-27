const Movie = require('../models/movie');
const cloudinary = require('cloudinary').v2;
var fs = require('fs');
const Actor = require('../models/actor');
const Producer = require('../models/producer');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET
});

exports.getAll = async (req, res) => {
    const Movies = await Movie.find({}).populate('actors producer');

    return res.status(200).send(Movies);
};

exports.add = async (req, res) => {
    const { name, year_of_release, plot, poster, actors, producer } = req.body;
    const isMovieExist = await Movie.findOne({ name });

    if (isMovieExist) {
        return res.status(400).send({ msg: 'Movie already exist' });
    }

    //upload file to cloudinary
    const imageUpload = await cloudinary.uploader.upload(`uploads/${req.file.filename}`);

    const newMovie = await Movie.create({
        name,
        year_of_release: new Date(year_of_release).toISOString(),
        plot,
        poster: imageUpload.secure_url,
        actors: JSON.parse(actors),
        producer: JSON.parse(producer)[0]
    });
    await newMovie.populate('actors producer');
    if (newMovie._id) {
        for (let i = 0; i < newMovie.actors.length; i++) {
            let allMovies = [];
            let actor = await Actor.findOne({ _id: newMovie.actors[i]._id });
            allMovies = [...actor.movies];
            allMovies.push(newMovie._id);
            await Actor.findOneAndUpdate({ _id: newMovie.actors[i]._id }, { movies: allMovies });
        }
        let producer1 = await Producer.findOne({ _id: newMovie.producer._id });
        let producerMovies = [];
        producerMovies = [...producer1.movies];
        producerMovies.push(newMovie._id);
        await Producer.findOneAndUpdate({ _id: newMovie.producer }, { movies: producerMovies });
    }

    const directory = 'uploads';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
    return res.status(200).send({ msg: 'Movie added successfully' });
};

exports.update = async (req, res) => {
    const updatedMovie = await Movie.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    return res.status(200).send({ msg: 'Movie updated successfully' });
};

exports.delete = async (req, res) => {
    const deletedMovie = await Movie.findOneAndDelete({ _id: req.params.id });

    return res.status(200).send({ msg: 'Movie deleted successfully' });
};
