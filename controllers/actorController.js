const Actor = require('../models/actor');

exports.getAll = async (req, res) => {
    const actors = await Actor.find({});

    return res.status(200).send(actors);
};

exports.add = async (req, res) => {
    const { name, gender, dob, bio } = req.body;
    const isActorExist = await Actor.findOne({ name });

    if (isActorExist) {
        return res.status(400).send({ msg: 'Actor already exist' });
    }

    const newActor = await Actor.create({ name, gender, dob, bio });

    return res.status(200).send({ msg: 'Actor added successfully' });
};

exports.update = async (req, res) => {
    const updatedActor = await Actor.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    return res.status(200).send({ msg: 'Actor updated successfully' });
};

exports.delete = async (req, res) => {
    const deletedActor = await Actor.findOneAndDelete({ _id: req.params.id });

    return res.status(200).send({ msg: 'Actor deleted successfully' });
};
