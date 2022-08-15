const express = require("express")
const {
  registerSeller,
  getProfile,
  login,
  logout,
  getAllSellers,
  updateProfile,
  registerUser,
  loginUser,
  _getProfile,
  switchToSeller,
} = require("../controllers/userController")
const {
  isAuthorized,
  isSeller,
  _isAuthorizedUser,
} = require("../utils/Authorization")
const Router = express.Router()

// Router.route("/register").post(registerSeller)
// Router.route("/login").post(login)
// Router.route("/user/logout").get(logout)
// Router.route("/me/dashboard").get(isAuthorized, isSeller, getProfile)
Router.route("/allsellers").get(getAllSellers)
// Router.route("/update/profile").put(isAuthorized, isSeller, updateProfile)

// For generalized user

Router.route("/user/register").post(registerUser)
Router.route("/user/login").post(loginUser)
Router.route("/user/logout").get(logout)
Router.route("/user/me/dashboard").get(_isAuthorizedUser, _getProfile)
Router.route("/user/update/profile").put(_isAuthorizedUser, updateProfile)
Router.route("/user/switch").post(_isAuthorizedUser, switchToSeller)

module.exports = Router
