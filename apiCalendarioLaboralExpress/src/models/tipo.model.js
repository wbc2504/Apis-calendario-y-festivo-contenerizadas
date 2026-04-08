const mongoose = require("mongoose");

const tipoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    tipo: { type: String, required: true, trim: true },
  },
  { versionKey: false, collection: "tipos" }
);

const Tipo = mongoose.model("Tipo", tipoSchema);

module.exports = { Tipo };
