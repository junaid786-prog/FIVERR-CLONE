const Gig = require("../models/Gig")
const Seller = require("../models/Seller")
const User = require("../models/User")
const ApiError = require("../utils/ApiError")
const CatchAsync = require("../utils/CatchAsync")
const v2 = require("../utils/cloudinary")
// 1. creating new gig

exports.createGig = CatchAsync(async (req, res, next) => {
  let seller = await User.findById(req.user.id)
  if (seller.gig_count > process.env.MAX_GIG_COUNT)
    throw new ApiError("Max Gig count can be 5", 401)
  const { title, description, packages, images, tags, category } = req.body
  const myCloud = await v2.uploader.upload(images, {
    folder: "services_images",
    crop: "scale",
  })
  const newGig = await Gig.create({
    title: title,
    description: description,
    packages: packages,
    images: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    gig_seller: seller,
    category: category,
    tags: tags,
  })
  // updating that seller with newly created gigs
  seller.services_offered.push(newGig) // pushing new gig to seller's services
  seller.gig_count = seller.services_offered.length // updating gig count
  await seller.save()

  res.status(200).json({
    sucess: true,
    message: "Gig is successfully created",
    gig: newGig,
  })
})

// 2. Updating Gig
exports.updateGig = CatchAsync(async (req, res, next) => {
  let seller = await User.findById(req.seller.id)
  const { title, description, packages, images } = req.body
  const updatedData = {
    title: title,
    description: description,
    packages: packages,
    images: images,
  }
  const updatedGig = await Gig.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  seller.services_offered.forEach((serviceId) => {
    if (serviceId == req.params.id) {
      serviceId = updatedGig._id
    }
  })
  await seller.save()
  res.status(200).json({
    success: true,
    message: "Gig is successfully updated",
    updatedGig,
  })
})

// 3. Get all gigs
exports.getAllMyGigs = CatchAsync(async (req, res, next) => {
  const seller = await User.findById(req.user.id)
  const gigsId = seller.services_offered
  let gigs = new Array()
  for (let i = 0; i < gigsId.length; i++) {
    let gig = await Gig.findById(gigsId[i])
    gigs.push(gig)
  }
  res.status(200).json({
    success: true,
    gigs_count: gigs.length,
    services: gigs,
  })
})

// 4. Gig Details
exports.getGigDetails = CatchAsync(async (req, res, next) => {
  const gigId = req.params.id
  const gig = await Gig.findById(gigId)
  if (!gig) throw new ApiError("Gig doesn't exist", 404)

  res.status(200).json({
    success: true,
    gig,
  })
})

// 5. Delete Gig
exports.deleteGig = CatchAsync(async (req, res) => {
  // update seller
  const seller = await Seller.findById(req.seller.id)
  seller.services_offered = seller.services_offered.filter((serviceId) => {
    return serviceId != req.params.id
  })
  seller.gig_count = seller.services_offered.length
  await seller.save()
  // deleting gig from db
  const gig = await Gig.findByIdAndDelete(req.params.id)
  if (!gig) throw new ApiError("Gig doesn't exist", 404)
  res.status(200).json({
    success: true,
    services_offered: seller.services_offered,
    count: seller.services_offered.length,
  })
})

// 6. Make  Gig Favorite

exports.likeGig = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const gig = await Gig.findById(req.params.id)
  if (!user || !gig) throw new ApiError("Gig or user doesn't exist", 404)
  if (user.favourite_gigs.length === 0) {
    user.favourite_gigs.push(gig)
  } else {
    user.favourite_gigs.forEach((service) => {
      if (service._id.toString() === gig._id.toString())
        throw new ApiError("Gig is already liked", 401)
    })
    user.favourite_gigs.push(gig)
  }

  await user.save()
  res.status(201).json({
    success: true,
    liked_services: user.favourite_gigs,
    message: "Gig is successfully added to favorite",
  })
})

// 7. Retrieve Favorite services

exports.getMyFavoriteGigs = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new ApiError("User not found")
  const gigsId = user.favourite_gigs
  let gigs = new Array()
  for (let i = 0; i < gigsId.length; i++) {
    let gig = await Gig.findById(gigsId[i])
    gigs.push(gig)
  }
  res.status(200).json({
    fav_services: gigs,
  })
})
