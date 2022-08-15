const jwt = require("jsonwebtoken")
const Buyer = require("../models/Buyer")
const Seller = require("../models/Seller")
const User = require("../models/User")
const ApiError = require("./ApiError")
const CatchAsync = require("./CatchAsync")

exports.isAuthorized = CatchAsync(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new ApiError("login first to access", 401)
  let jwtData = jwt.verify(token, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  let seller = await Seller.findById(jwtData.id)
  req.seller = seller
  next()
})

exports.isAuthorizedBuyer = CatchAsync(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new ApiError("login first to access", 401)
  let jwtData = jwt.verify(token, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  let buyer = await Buyer.findById(jwtData.id)
  req.buyer = buyer
  next()
})

exports.isBuyer = CatchAsync(async (req, res, next) => {
  const user = await Buyer.findById(req.buyer.id)

  // check if user is seller
  const roles = user.role
  let ok = roles.includes("buyer")
  if (!ok)
    throw new ApiError("you do not have permission to (only buyers)", 402)
  next()
})

// for generalized user
exports._isAuthorizedUser = CatchAsync(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new ApiError("login first to access", 401)
  let jwtData = jwt.verify(token, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  let user = await User.findById(jwtData.id)
  req.user = user
  next()
})

exports.isSeller = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  // check if user is seller
  user.mode = "seller"
  let ok = user.mode === "seller"
  if (!ok)
    throw new ApiError("you donot have permission to (only sellers)", 402)
  next()
})
