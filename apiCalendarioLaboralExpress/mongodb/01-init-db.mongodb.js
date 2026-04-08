db = db.getSiblingDB("calendario_laboral");

const collectionNames = db.getCollectionNames();
const requiredCollections = [
  "paises",
  "tipos",
  "tipos_festivo",
  "festivos",
  "calendario",
  "usuarios",
  "counters",
];

for (const name of requiredCollections) {
  if (!collectionNames.includes(name)) {
    db.createCollection(name);
  }
}

db.paises.createIndex({ id: 1 }, { unique: true, name: "ux_paises_id" });
db.tipos.createIndex({ id: 1 }, { unique: true, name: "ux_tipos_id" });
db.tipos_festivo.createIndex(
  { id: 1 },
  { unique: true, name: "ux_tipos_festivo_id" }
);
db.festivos.createIndex({ id: 1 }, { unique: true, name: "ux_festivos_id" });
db.festivos.createIndex({ idPais: 1 }, { name: "ix_festivos_idPais" });
db.festivos.createIndex({ idTipo: 1 }, { name: "ix_festivos_idTipo" });
db.calendario.createIndex(
  { id: 1 },
  { unique: true, name: "ux_calendario_id" }
);
db.calendario.createIndex(
  { idPais: 1, fecha: 1 },
  { unique: true, name: "ux_calendario_idPais_fecha" }
);
db.usuarios.createIndex({ id: 1 }, { unique: true, name: "ux_usuarios_id" });
db.usuarios.createIndex(
  { usuario: 1 },
  { unique: true, name: "ux_usuarios_usuario" }
);
db.counters.createIndex(
  { name: 1 },
  { unique: true, name: "ux_counters_name" }
);

print("Colecciones e indices de MongoDB listos.");
