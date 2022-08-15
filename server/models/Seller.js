const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [20, "Name cannot be more than 20 chars"],
    minLength: [4, "Name cannot be less than 4 chars"],
    required: [true, "Enter your name"],
  },
  about: {
    type: String,
    maxLength: [200, "Name cannot be more than 200 chars"],
    minLength: [20, "Name cannot be less than 20 chars"],
    required: [true, "Write more about you"],
  },
  phoneNo: {
    type: Number,
    maxLength: [14, "Number cannot be more than 14 chars"],
    required: [true, "Enter phone no"],
  },
  gmail: {
    type: String,
    required: [true, "Enter gmail"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter valid gmail")
      }
    },
  },
  password: {
    type: String,
    required: [true, "Enter password"],
    maxLength: [10, "Password cannot be more than 10 chars"],
    minLength: [7, "Password cannot be less than 7 chars"],
    select: false,
  },
  role: [
    {
      type: String,
      default: "user",
    },
  ],
  age: {
    type: Number,
    minlength: [15, "age must be greater than 15"],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  joining_year: {
    type: Number,
  },
  skills: [
    {
      type: String,
    },
  ],
  services_offered: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "gigs",
      // required: true,
    },
  ],
  gig_count: {
    type: Number,
    default: 0,
  },
})
// before saving schema to db first hashing the password
SellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// schema methods
// 1. generating web token (needed to have in cookie when logged in first time)
SellerSchema.methods.getJWTToken = function () {
  let res = jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  return res
}

// 2. comparing passwords (needed to compare on login time bcz password typed and pswrd stored in db are diff)
SellerSchema.methods.comparePasswords = async function (enteredPassword) {
  let res = await bcrypt.compare(enteredPassword, this.password)
  return res
}

module.exports = mongoose.model("sellers", SellerSchema)
