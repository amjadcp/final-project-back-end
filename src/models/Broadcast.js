const mongoose = require('mongoose')
const { UserEnum } = require('../utils/enum')

const Broadcast = new mongoose.Schema(
    {
        subject: String,
        message: String,
        target: {
            type: String,
            enum: {
                values: Object.values(UserEnum),
                message: "Invalid target"
            },
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        keepAs: {
            type: String,
            enum: ["Archive", "Published"],
            default: "Archive"
        }
    }
)

module.exports = mongoose.model("broadcast", Broadcast)