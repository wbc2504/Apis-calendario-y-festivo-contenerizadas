const mongoose = require("mongoose");

const festivoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
    dia: { type: Number, required: true },
    mes: { type: Number, required: true },
    diasPascua: { type: Number, required: true, default: 0 },
    idPais: { type: Number, required: true, index: true },
    idTipo: { type: Number, required: true, index: true },
  },
  { versionKey: false, collection: "festivos" }
);

const Festivo = mongoose.model("Festivo", festivoSchema);

module.exports = { Festivo };
