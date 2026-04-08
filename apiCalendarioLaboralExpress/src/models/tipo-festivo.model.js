const mongoose = require("mongoose");

const tipoFestivoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    tipo: { type: String, required: true, trim: true },
  },
  { versionKey: false, collection: "tipos_festivo" }
);

const TipoFestivo = mongoose.model("TipoFestivo", tipoFestivoSchema);

module.exports = { TipoFestivo };
