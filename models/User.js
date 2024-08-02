const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

module.exports = mongoose.model("user", User);
