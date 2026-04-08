const jwt = require("jsonwebtoken");
const { BaseCrudService } = require("./base-crud.service");
const { Usuario } = require("../models/usuario.model");
const { env } = require("../config/env");

const baseUsuarioService = new BaseCrudService({
  model: Usuario,
  sequenceName: "usuario",
  searchField: "nombre",
});

async function login(nombreUsuario, clave) {
  const usuario = await Usuario.findOne({
    usuario: nombreUsuario,
    clave,
    activo: true,
  }).lean();

  if (!usuario) {
    return { usuario: null, token: "" };
  }

  const token = jwt.sign({}, env.jwtSecret, {
    subject: nombreUsuario,
    expiresIn: env.jwtExpiresIn,
  });

  return { usuario, token };
}

baseUsuarioService.login = login;

module.exports = {
  usuarioService: baseUsuarioService,
};
