const { BaseCrudService } = require("./base-crud.service");
const { Festivo } = require("../models/festivo.model");
const { Pais } = require("../models/pais.model");
const { TipoFestivo } = require("../models/tipo-festivo.model");
const {
  addDays,
  applyEcuadorBridge,
  createUtcDate,
  formatDate,
  getEasterDate,
  isValidDateParts,
  nextMonday,
} = require("../utils/date-utils");

const baseFestivoService = new BaseCrudService({
  model: Festivo,
  sequenceName: "festivo",
  searchField: "nombre",
});

async function buildFestivoResponse(festivo) {
  if (!festivo) {
    return null;
  }

  const [pais, tipo] = await Promise.all([
    Pais.findOne({ id: festivo.idPais }).lean(),
    TipoFestivo.findOne({ id: festivo.idTipo }).lean(),
  ]);

  return {
    id: festivo.id,
    nombre: festivo.nombre,
    dia: festivo.dia,
    mes: festivo.mes,
    diasPascua: festivo.diasPascua,
    pais,
    tipo,
  };
}

async function list() {
  const festivos = await Festivo.find().sort({ nombre: 1 }).lean();
  return Promise.all(festivos.map(buildFestivoResponse));
}

async function get(id) {
  const festivo = await Festivo.findOne({ id: Number(id) }).lean();
  return buildFestivoResponse(festivo);
}

async function search(nombre) {
  const festivos = await Festivo.find({
    nombre: { $regex: nombre, $options: "i" },
  })
    .sort({ nombre: 1 })
    .lean();

  return Promise.all(festivos.map(buildFestivoResponse));
}

function resolveHolidayDate(festivo, year) {
  switch (festivo.idTipo) {
    case 1:
      return createUtcDate(year, festivo.mes, festivo.dia);
    case 2:
      return nextMonday(createUtcDate(year, festivo.mes, festivo.dia));
    case 3:
      return addDays(getEasterDate(year), festivo.diasPascua);
    case 4:
      return nextMonday(addDays(getEasterDate(year), festivo.diasPascua));
    case 5:
      return applyEcuadorBridge(createUtcDate(year, festivo.mes, festivo.dia));
    default:
      throw new Error(`Tipo festivo no soportado: ${festivo.idTipo}`);
  }
}

async function listByCountryAndYear(idPais, year) {
  const festivos = await Festivo.find({ idPais: Number(idPais) })
    .sort({ nombre: 1 })
    .lean();

  return festivos.map((festivo) => ({
    nombre: festivo.nombre,
    fecha: formatDate(resolveHolidayDate(festivo, Number(year))),
  }));
}

async function verify(idPais, year, month, day) {
  if (!isValidDateParts(year, month, day)) {
    const error = new Error(
      `Fecha invalida: year=${year}, month=${month}, day=${day}`
    );
    error.status = 400;
    throw error;
  }

  const target = formatDate(createUtcDate(year, month, day));
  const festivos = await listByCountryAndYear(idPais, year);
  return festivos.some((festivo) => festivo.fecha === target);
}

function normalizeFestivoPayload(payload) {
  return {
    id: payload.id ? Number(payload.id) : undefined,
    nombre: payload.nombre,
    dia: Number(payload.dia || 0),
    mes: Number(payload.mes || 0),
    diasPascua: Number(payload.diasPascua || 0),
    idPais: Number(payload.pais?.id ?? payload.idPais),
    idTipo: Number(payload.tipo?.id ?? payload.idTipo),
  };
}

async function create(payload) {
  const festivo = await baseFestivoService.create(normalizeFestivoPayload(payload));
  return buildFestivoResponse(festivo);
}

async function update(payload) {
  const festivo = await baseFestivoService.update(normalizeFestivoPayload(payload));
  return buildFestivoResponse(festivo);
}

baseFestivoService.create = create;
baseFestivoService.get = get;
baseFestivoService.list = list;
baseFestivoService.search = search;
baseFestivoService.update = update;
baseFestivoService.verify = verify;
baseFestivoService.listByCountryAndYear = listByCountryAndYear;

module.exports = {
  festivoService: baseFestivoService,
};
