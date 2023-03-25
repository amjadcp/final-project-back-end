const mongoose = require('mongoose')
const validator = require("validator");

const achievementSchema = mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Achievement = mongoose.model('achievement', achievementSchema);

module.exports = Achievement;