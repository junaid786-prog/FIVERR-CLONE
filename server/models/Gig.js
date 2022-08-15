const mongoose = require("mongoose")
const GigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please write gig title first"],
    maxlength: [100, "title cannot be of more than 100 characters"],
    minlength: [40, "title cannot be of less than 40 characters"],
  },
  description: {
    type: String,
    required: [true, "please write gig description first"],
    maxlength: [1200, "description cannot be of more than 700 characters"],
    minlength: [400, "description cannot be of less than 400 characters"],
  },
  images: [
    {
      public_id: {
        // where these images will be hosted an id and url will be provided by hoster
        type: String,
        required: [true, "insert Gig image"],
      },
      url: {
        type: String,
        required: [true, "insert Gig image"],
      },
    },
  ],
  packages: [
    {
      package_name: {
        type: String,
        required: [true, "please write package name"],
        maxlength: [20, "package name cannot be of more than 20 characters"],
        minlength: [7, "package name cannot be of less than 7 characters"],
      },
      package_price: {
        type: Number,
        required: [true, "please enter package price"],
        maxlength: [5, "price cannot be more than 10000"],
        minlength: [2, "price cannot be less than 10"],
      },
      package_description: {
        type: String,
        required: [true, "please write package description"],
        maxlength: [200, "description cannot be of more than 200 characters"],
        minlength: [30, "description cannot be of less than 30 characters"],
      },
    },
  ],
  tags: [
    {
      type: String,
      required: [true, "enter at least 3 tags"],
    },
  ],
  category: {
    type: String,
    required: [true, "select category of your gig"],
  },
  gig_orders: {
    type: Number,
    default: 0,
  },
  gig_reviews: [
    {
      reviewer: {
        type: String,
      },
    },
  ],
  total_reviews: {
    type: Number,
    default: 0,
  },
  gig_rating: {
    type: Number,
    default: 0,
  },
  gig_seller: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    //required: true,
  },
})

module.exports = mongoose.model("gigs", GigSchema)
