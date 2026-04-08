const mongoose = require("mongoose");

const paisSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
  },
  { versionKey: false, collection: "paises" }
);

const Pais = mongoose.model("Pais", paisSchema);

module.exports = { Pais };
