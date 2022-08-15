const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "sellers",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "sellers",
    required: true,
  },
  message_content: {
    type: string,
    minlength: [1, "insert a message"],
    required: true,
  },
  sent_time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("messages", MessageSchema);
