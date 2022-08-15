const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const errorMiddelware = require("./utils/ErrorMiddelware")
const cors = require("cors")
require("dotenv").config()

// Routes
const USERROUTE = require("./routes/UserRoute")
const GIGROUTE = require("./routes/GigRoute")

const ApiError = require("./utils/ApiError")
const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use("/api", GIGROUTE)
app.use("/api", USERROUTE)

app.use(errorMiddelware)

app.get("/", (req, res, next) => {
  res.send("app is running")
})

// app.all("*", (req, res, next) => {
//   throw new ApiError("Path not found here", 404)
// })
module.exports = app
