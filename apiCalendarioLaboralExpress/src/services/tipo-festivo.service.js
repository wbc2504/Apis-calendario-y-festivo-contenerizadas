const { BaseCrudService } = require("./base-crud.service");
const { TipoFestivo } = require("../models/tipo-festivo.model");

const tipoFestivoService = new BaseCrudService({
  model: TipoFestivo,
  sequenceName: "tipo_festivo",
  searchField: "tipo",
});

module.exports = { tipoFestivoService };
