const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./api');
const dontenv = require('dotenv');
dontenv.config();

const app = express();

const Port = 8000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all routes
app.use(api);

//error handling
app.use((err, req, res, next) => {
    if (err?.message) {
        res.status(500).send({ msg: err.message });
    } else {
        res.status(500).send(err);
    }
});

app.listen(Port, () => {
    console.log('server running on Port:', Port);
});

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err.message);
    });
