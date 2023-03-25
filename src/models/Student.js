const mongoose = require("mongoose");
const validator = require("validator");
const { StudentRoleEnum } = require("../utils/enum");
const User = require("./User");

const Student = new mongoose.Schema(
  {
    
    batch: {
      start: String,
      end: String,
      period: {
        type: String,
        validate: {
          validator: (val)=> /^\d{4}-\d{2}$/.test(val)===true,
          message: "period should be in 2021-23 format"
        }
      } // exp: 2021-23
    },
    role: {
      type: String,
      enum: {
        values: Object.values(StudentRoleEnum),
        message: "Invalid role"
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  // { discriminatorKey: 'userType'},
);


// Student.index({user:1})
module.exports = User.discriminator('student', Student);