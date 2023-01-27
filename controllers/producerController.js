const Producer = require('../models/producer');

exports.getAll = async (req, res) => {
    const producer = await Producer.find({});

    return res.status(200).send(producer);
};

exports.add = async (req, res) => {
    const { name, gender, dob, bio } = req.body;

    const isProducerExist = await Producer.findOne({ name });

    if (isProducerExist) {
        return res.status(400).send({ msg: 'Producer already exist' });
    }

    const newProducer = await Producer.create({ name, gender, dob, bio });

    return res.status(200).send({ msg: 'Producer added successfully' });
};

exports.update = async (req, res) => {
    const updatedProducer = await Producer.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    return res.status(200).send({ msg: 'Producer updated successfully' });
};

exports.delete = async (req, res) => {
    const deletedProducer = await Producer.findOneAndDelete({ _id: req.params.id });

    return res.status(200).send({ msg: 'Producer deleted successfully' });
};
