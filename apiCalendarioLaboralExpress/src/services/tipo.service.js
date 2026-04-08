const { BaseCrudService } = require("./base-crud.service");
const { Tipo } = require("../models/tipo.model");

const tipoService = new BaseCrudService({
  model: Tipo,
  sequenceName: "tipo",
  searchField: "tipo",
});

module.exports = { tipoService };
