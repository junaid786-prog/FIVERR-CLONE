const parseValidationError = (e) => {
  let res = {}
  e = e.slice(e.indexOf(":") + 1).trim()
  let eArrray = e.split(",").map((err) => err.trim())
  eArrray.forEach((err) => {
    ;[key, val] = err.split(":")
    res[key] = val
  })
  return res
}
module.exports = errorMiddelware = (err, req, res, next) => {
  let statusCode = err.status || 500
  let message = err.message
  switch (err.name) {
    case "ValidationError": {
      message = parseValidationError(err.message)
      break
    }
    case "CastError": {
      message = "failed to cast id to _id of object"
      break
    }
    default:
      message = err.message
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: err.stack,
  })
}
