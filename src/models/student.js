const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      trim: true,
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
    dob: {
      type: String,
      required: [true, "Please provide date of birth"],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: (val)=>validator.isMobilePhone(val, 'en-IN'),
        message: "please provide valid phone number"
      }
    },
    whatsAppNumber: {
      type: String,
      validate: {
        validator: (val)=>validator.isMobilePhone(val, 'en-IN'),
        message: "please provide valid phone number"
      }
    },
    aditionalRoles: [{  // if user is alumin will include his current status like is company, role, etc
      role: {type : String, default: "student"},
      company: String
    }],
    batch: {
      start: String,
      end: String,
      period: String // exp: 2021-23
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      select: false
    },
  },
  { timestamps: true }
);

studentSchema.pre('save', async function (next) {
  //only run this function if password was modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;