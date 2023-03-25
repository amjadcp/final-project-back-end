const mongoose = require('mongoose')
const { UserEnum } = require('../utils/enum')

const Broadcast = new mongoose.Schema(
    {
        message: String,
        target: {
            type: String,
            enum: {
                values: Object.values(UserEnum),
                message: "Invalid target"
            }
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("broadcast", Broadcast)