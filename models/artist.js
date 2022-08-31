//Artist models
import mongoose from 'mongoose'

// const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    artistBio: {
        type: String,
        required: true
    },
    artistImage: {
        type: String,
        required: true
    },
    artistVideo: {
        type: String,
        required: true
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = {
    Artist
}