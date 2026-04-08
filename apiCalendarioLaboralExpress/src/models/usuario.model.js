const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    usuario: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    clave: { type: String, required: true },
    activo: { type: Boolean, default: true },
    foto: { type: String, default: null },
    roles: { type: String, default: "" },
  },
  { versionKey: false, collection: "usuarios" }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = { Usuario };
