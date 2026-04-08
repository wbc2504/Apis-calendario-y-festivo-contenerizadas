const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const Counter = mongoose.model("Counter", counterSchema, "counters");

module.exports = { Counter };
