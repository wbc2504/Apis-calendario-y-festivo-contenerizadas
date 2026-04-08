const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { Usuario } = require("../models/usuario.model");

const publicPrefixes = ["/health", "/api/usuarios/validar"];

function isPublicRoute(pathname) {
  return publicPrefixes.some((prefix) => pathname.startsWith(prefix));
}

async function authMiddleware(req, res, next) {
  if (isPublicRoute(req.path)) {
    return next();
  }

  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const usuario = await Usuario.findOne({ usuario: payload.sub }).lean();

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no valido" });
    }

    req.usuario = usuario;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Token invalido o expirado" });
  }
}

module.exports = { authMiddleware };
