const mongoose = require("mongoose");
const validator = require("validator");
const { PronounceEnum } = require("../utils/enum");

// sample use-case
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      trim: true,
    },
    pronounce: {
      type: String,
      enum: {
        values: Object.values(PronounceEnum),
        message: 'role not allowed'
      },
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
      trim: true,
    },
    whatsAppNumber: {
      type: String,
      unique: true,
      validate: {
        validator: (val)=>validator.isMobilePhone(val, 'en-IN'),
        message: "please provide valid phone number"
      }
    },
    aditionalRoles: [{  // if user is alumin will include his current status like is company, role, etc
      role: String,
      company: String,
      description: String,
      start: Date,
      end: Date,
      period: String,
      certificate: String
    }],
    description: String,
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      trim: true,
    },
  },
  { discriminatorKey: 'userType'},
  { timestamps: true }
);

module.exports = mongoose.model("user", User);