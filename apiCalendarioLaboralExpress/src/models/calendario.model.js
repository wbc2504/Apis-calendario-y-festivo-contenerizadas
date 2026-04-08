const mongoose = require("mongoose");

const calendarioSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    fecha: { type: String, required: true },
    descripcion: { type: String, default: "" },
    idTipo: { type: Number, required: true, index: true },
    idPais: { type: Number, required: true, index: true },
  },
  { versionKey: false, collection: "calendario" }
);

calendarioSchema.index({ idPais: 1, fecha: 1 }, { unique: true });

const Calendario = mongoose.model("Calendario", calendarioSchema);

module.exports = { Calendario };
