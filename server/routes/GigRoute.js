const express = require("express")
const {
  createGig,
  updateGig,
  getAllMyGigs,
  getGigDetails,
  deleteGig,
  likeGig,
  getMyFavoriteGigs,
  unLikeGig,
} = require("../controllers/gigController")
const { _isAuthorizedUser, isSeller } = require("../utils/Authorization")
const Router = express.Router()

Router.route("/gigs/create").post(_isAuthorizedUser, isSeller, createGig)
Router.route("/gigs/all").get(_isAuthorizedUser, getAllMyGigs)
Router.route("/gigs/update/:id").put(_isAuthorizedUser, isSeller, updateGig)

Router.route("/gig/:id").get(_isAuthorizedUser, isSeller, getGigDetails)
Router.route("/gigs/delete/:id").get(_isAuthorizedUser, isSeller, deleteGig)
Router.route("/gigs/like/:id").get(_isAuthorizedUser, likeGig)
Router.route("/gigs/favorite").get(_isAuthorizedUser, getMyFavoriteGigs)
Router.route("/gigs/unlike/:id").get(_isAuthorizedUser, unLikeGig)

module.exports = Router
