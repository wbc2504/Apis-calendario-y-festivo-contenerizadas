const { BaseCrudService } = require("./base-crud.service");
const { Pais } = require("../models/pais.model");

const paisService = new BaseCrudService({
  model: Pais,
  sequenceName: "pais",
  searchField: "nombre",
});

module.exports = { paisService };
