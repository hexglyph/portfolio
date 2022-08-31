//Artist Service

const { Artist } = require('../models/artist');

const getArtist = async (req, res) => {
    const { id } = req.params;
    try {
        const artist = await Artist.findById(id);
        res.status(200).json(artist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createArtist = async (req, res) => {
    const artist = req.body;
    const newArtist = new Artist(artist);
    try {
        await newArtist.save();
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateArtist = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const artist = await Artist.findByIdAndUpdate(id, { name, email, password }, { new: true });
        res.status(200).json(artist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteArtist = async (req, res) => {
    const { id } = req.params;
    try {
        await Artist.findByIdAndRemove(id);
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getArtist,
    getArtists,
    createArtist,
    updateArtist,
    deleteArtist
}