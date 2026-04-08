const { Calendario } = require("../models/calendario.model");
const { Pais } = require("../models/pais.model");
const { Tipo } = require("../models/tipo.model");
const { getNextSequence } = require("./counter.service");
const { festivoService } = require("./festivo.service");
const {
  addDays,
  createUtcDate,
  formatDate,
  getDayName,
  getTotalDaysInYear,
  isWeekend,
} = require("../utils/date-utils");

async function buildCalendarioResponse(item) {
  const [pais, tipo] = await Promise.all([
    Pais.findOne({ id: item.idPais }).lean(),
    Tipo.findOne({ id: item.idTipo }).lean(),
  ]);

  return {
    id: item.id,
    fecha: item.fecha,
    descripcion: item.descripcion,
    pais,
    tipo,
  };
}

async function generate(idPais, year) {
  const numericPaisId = Number(idPais);
  const numericYear = Number(year);
  const pais = await Pais.findOne({ id: numericPaisId }).lean();

  if (!pais) {
    const error = new Error("Pais no encontrado");
    error.status = 404;
    throw error;
  }

  const tipos = await Tipo.find().lean();
  const tipoLaboral = tipos.find((tipo) => tipo.id === 1);
  const tipoFinSemana = tipos.find((tipo) => tipo.id === 2);
  const tipoFestivo = tipos.find((tipo) => tipo.id === 3);

  const festivos = await festivoService.listByCountryAndYear(numericPaisId, numericYear);
  const festivosPorFecha = new Set(festivos.map((item) => item.fecha));
  const firstDay = createUtcDate(numericYear, 1, 1);
  const totalDays = getTotalDaysInYear(numericYear);

  for (let offset = 0; offset < totalDays; offset += 1) {
    const currentDate = addDays(firstDay, offset);
    const fecha = formatDate(currentDate);
    const descripcion = getDayName(currentDate);

    let idTipo = tipoLaboral.id;
    if (festivosPorFecha.has(fecha)) {
      idTipo = tipoFestivo.id;
    } else if (isWeekend(descripcion)) {
      idTipo = tipoFinSemana.id;
    }

    const existing = await Calendario.findOne({
      idPais: numericPaisId,
      fecha,
    }).lean();

    if (existing) {
      await Calendario.updateOne(
        { id: existing.id },
        { fecha, descripcion, idTipo, idPais: numericPaisId }
      );
      continue;
    }

    await Calendario.create({
      id: await getNextSequence("calendario"),
      fecha,
      descripcion,
      idTipo,
      idPais: numericPaisId,
    });
  }

  return true;
}

async function listByCountryAndYear(idPais, year) {
  const items = await Calendario.find({
    idPais: Number(idPais),
    fecha: { $regex: `^${Number(year)}-` },
  })
    .sort({ fecha: 1 })
    .lean();

  return Promise.all(items.map(buildCalendarioResponse));
}

module.exports = {
  calendarioService: {
    generate,
    listByCountryAndYear,
  },
};
