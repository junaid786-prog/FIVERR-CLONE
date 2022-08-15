//const Buyer = require("../models/Buyer")
//const Seller = require("../models/Seller")
const User = require("../models/User")
const ApiError = require("../utils/ApiError")
const CatchAsync = require("../utils/CatchAsync")
const { sendToken, _sendToken } = require("../utils/JWTToken")

// register new Seller
exports.registerSeller = CatchAsync(async (req, res, next) => {
  const { name, gmail, password, about, phoneNo, age, country, skills } =
    req.body
  const userExists = await User.findOne({ gmail })
  if (userExists) {
    throw new ApiError("User already exists", 400)
  }

  let year = new Date(Date.now()).getFullYear()
  const roles = ["user", "seller"]
  const newSeller = await Seller.create({
    name,
    gmail,
    password,
    about,
    phoneNo,
    age,
    country,
    skills,
    joining_year: year,
    role: roles,
  })

  sendToken(newSeller, 200, res)
})
// login
exports.login = CatchAsync(async (req, res, next) => {
  const { gmail, password } = req.body
  const user = await Seller.findOne({ gmail }).select("+password")
  if (!user) throw new ApiError("Invalid gmail or password", 402)
  let ok = await user.comparePasswords(password)
  if (!ok) throw new ApiError("Invalid gmail or password 2", 402)

  sendToken(user, 200, res)
})
// logout
exports.logout = CatchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "logged out",
  })
})
// get profile
exports.getProfile = CatchAsync(async (req, res, next) => {
  const me = await Seller.findById(req.seller.id)
  if (!me) throw new ApiError("cannot find", 404)

  res.status(200).json({
    success: true,
    user: me,
  })
})
// update
exports.updateProfile = CatchAsync(async (req, res) => {
  const { name, about, country } = req.body
  const updatedData = { name: name, about: about, country: country }
  const updatedSeller = await Seller.findByIdAndUpdate(
    req.seller.id,
    updatedData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  res.status(200).json({
    success: true,
    message: "User successfully upated",
    updatedSeller,
  })
})

// FOR GENERALIZED USER
////////////// REGISTER USER (START) -> as buyer //////////////////
exports.registerUser = CatchAsync(async (req, res) => {
  const { name, gmail, password, phoneNo, country } = req.body
  const alreadyExists = await User.findOne({ gmail: gmail })
  if (alreadyExists) throw new ApiError("User already exists", 402)
  const user = await User.create({
    name,
    gmail,
    password,
    role: ["user", "buyer"],
    mode: "buyer",
    phoneNo,
    country,
  })
  _sendToken(user, 200, res)
})

////////////// Login Buyer -> generalized user  ///////////

exports.loginUser = CatchAsync(async (req, res, next) => {
  const { gmail, password } = req.body
  const user = await User.findOne({ gmail }).select("+password")
  if (!user) throw new ApiError("Invalid gmail or password", 402)
  let ok = await user.comparePasswords(password)
  if (!ok) throw new ApiError("Invalid gmail or password", 402)
  _sendToken(user, 200, res)
})

// Switch to seller mode
exports.switchToSeller = CatchAsync(async (req, res, next) => {
  let existingUser = await User.findById(req.user.id)
  // if existing user is already seller then move next by returning seller
  if (existingUser.role.includes("seller")) {
    res.status(200).json({
      success: true,
      seller: existingUser,
    })
  }
  // otherwise registering it as seller also
  existingUser.role.push("seller")
  if (!req.body.about || !req.body.about)
    throw new ApiError("Enter required things", 402)
  const { about, age } = req.body
  let year = new Date(Date.now()).getFullYear()
  existingUser.about = about
  existingUser.age = age
  existingUser.mode = "seller"
  existingUser.joining_year = year
  existingUser.save()

  res.status(200).json({
    success: true,
    seller: existingUser,
  })
})

// get profile
exports._getProfile = CatchAsync(async (req, res, next) => {
  const me = await User.findById(req.user.id)
  if (!me) throw new ApiError("cannot find", 404)

  res.status(200).json({
    success: true,
    user: me,
  })
})
// update
exports._updateProfile = CatchAsync(async (req, res) => {
  const { name, about, country } = req.body
  const updatedData = { name: name, about: about, country: country }
  const updatedSeller = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    message: "User successfully upated",
    updatedSeller,
  })
})

//////////////  Extra function /////////
exports.getAllSellers = CatchAsync(async (req, res, next) => {
  const sellers = await User.find()
  if (!sellers) throw new ApiError("no seller exist", 404)

  res.status(200).json({
    success: true,
    sellers,
  })
})
