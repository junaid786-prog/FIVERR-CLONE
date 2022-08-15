// creating token and storing it to cookie

const COOKIE_EXPIRE = process.env.JWT_EXPIRE
exports.sendToken = (user, statusCode, res) => {
  const JWT_TOKEN = user.getJWTToken()
  //cookie options
  const options = {
    expiresIn: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 100), //milli seconds
    httpOnly: true,
  }
  res.status(statusCode).cookie("token", JWT_TOKEN, options).json({
    success: true,
    seller: user,
    JWT_TOKEN,
  })
}

// for general user
exports._sendToken = (user, statusCode, res) => {
  const JWT_TOKEN = user.getJWTToken()
  //cookie options
  const options = {
    expiresIn: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 100), //milli seconds
    httpOnly: true,
  }
  res.cookie("token", JWT_TOKEN, options)
  res.status(statusCode).json({
    success: true,
    user,
    JWT_TOKEN,
  })
}
