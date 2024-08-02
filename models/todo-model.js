const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  edit: { type: Boolean, required: true },
  priority: { type: String, required: true },
});

module.exports = mongoose.model("Todo", TodoSchema);
