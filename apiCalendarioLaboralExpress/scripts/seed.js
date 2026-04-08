const path = require("path");
const { connectToDatabase } = require("../src/config/database");
const { parseInsertStatements } = require("../src/utils/sql-seed-parser");
const { Pais } = require("../src/models/pais.model");
const { Tipo } = require("../src/models/tipo.model");
const { TipoFestivo } = require("../src/models/tipo-festivo.model");
const { Festivo } = require("../src/models/festivo.model");
const { Usuario } = require("../src/models/usuario.model");
const { Calendario } = require("../src/models/calendario.model");
const { Counter } = require("../src/models/counter.model");
const { syncSequence } = require("../src/services/counter.service");

const SQL_FILE = path.resolve(
  __dirname,
  "../../BD/DML - CalendarioLaboral.sql"
);

async function getMaxId(model) {
  const item = await model.findOne().sort({ id: -1 }).lean();
  return item?.id || 0;
}

async function seed() {
  await connectToDatabase();

  await Promise.all([
    Pais.deleteMany({}),
    Tipo.deleteMany({}),
    TipoFestivo.deleteMany({}),
    Festivo.deleteMany({}),
    Usuario.deleteMany({}),
    Calendario.deleteMany({}),
    Counter.deleteMany({}),
  ]);

  const inserts = parseInsertStatements(SQL_FILE);
  let generatedUserId = 0;

  for (const insert of inserts) {
    switch (insert.tableName.toLowerCase()) {
      case "tipofestivo":
        await TipoFestivo.create({
          id: Number(insert.payload.Id),
          tipo: insert.payload.Tipo,
        });
        break;
      case "pais":
        await Pais.create({
          id: Number(insert.payload.Id),
          nombre: insert.payload.Nombre,
        });
        break;
      case "festivo":
        await Festivo.create({
          id: (await getMaxId(Festivo)) + 1,
          nombre: insert.payload.Nombre,
          dia: Number(insert.payload.Dia),
          mes: Number(insert.payload.Mes),
          diasPascua: Number(insert.payload.DiasPascua),
          idPais: Number(insert.payload.IdPais),
          idTipo: Number(insert.payload.IdTipo),
        });
        break;
      case "tipo":
        await Tipo.create({
          id: Number(insert.payload.Id),
          tipo: insert.payload.Tipo,
        });
        break;
      case "usuario":
        generatedUserId += 1;
        await Usuario.create({
          id: generatedUserId,
          usuario: insert.payload.Usuario,
          nombre: insert.payload.Nombre,
          clave: insert.payload.Clave,
          activo: true,
          roles: insert.payload.Roles || "",
        });
        break;
      default:
        break;
    }
  }

  await Promise.all([
    syncSequence("pais", await getMaxId(Pais)),
    syncSequence("tipo", await getMaxId(Tipo)),
    syncSequence("tipo_festivo", await getMaxId(TipoFestivo)),
    syncSequence("festivo", await getMaxId(Festivo)),
    syncSequence("usuario", await getMaxId(Usuario)),
    syncSequence("calendario", 0),
  ]);

  console.log("Seed completado correctamente.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error ejecutando el seed:", error);
  process.exit(1);
});
