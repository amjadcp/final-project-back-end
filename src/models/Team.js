const mongoose = require("mongoose");
const validator = require("validator");
const { TeamRoleEnum } = require("../utils/enum");
const User = require("./User");

const Team = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: {
        values: Object.values(TeamRoleEnum),
        message: "Invalid role"
      }
    }
  },
  // { discriminatorKey: 'user'},
);

// Team.index({user:1})
module.exports = User.discriminator('team', Team);