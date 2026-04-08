const { createCrudRouter } = require("./crud-routes");
const { paisService } = require("../services/pais.service");
const { tipoService } = require("../services/tipo.service");
const { tipoFestivoService } = require("../services/tipo-festivo.service");
const { usuarioService } = require("../services/usuario.service");
const { festivoService } = require("../services/festivo.service");
const { calendarioService } = require("../services/calendario.service");

function registerRoutes(app) {
  app.use("/api/paises", createCrudRouter(paisService));
  app.use("/api/tipos", createCrudRouter(tipoService));
  app.use("/api/TipoFestivos", createCrudRouter(tipoFestivoService));

  app.get("/api/usuarios/validar/:nombreUsuario/:clave", async (req, res, next) => {
    try {
      const { nombreUsuario, clave } = req.params;
      res.json(await usuarioService.login(nombreUsuario, clave));
    } catch (error) {
      next(error);
    }
  });
  app.use("/api/usuarios", createCrudRouter(usuarioService));

  app.get("/api/festivos/verificar/:idPais/:anio/:mes/:dia", async (req, res, next) => {
    try {
      const { idPais, anio, mes, dia } = req.params;
      res.json(
        await festivoService.verify(
          Number(idPais),
          Number(anio),
          Number(mes),
          Number(dia)
        )
      );
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/festivos/listar/:idPais/:anio", async (req, res, next) => {
    try {
      const { idPais, anio } = req.params;
      res.json(await festivoService.listByCountryAndYear(idPais, anio));
    } catch (error) {
      next(error);
    }
  });

  app.use(
    "/api/festivos",
    createCrudRouter(festivoService, {
      create: festivoService.create,
      update: festivoService.update,
    })
  );

  app.get("/api/calendario/generar/:idPais/:anio", async (req, res, next) => {
    try {
      const { idPais, anio } = req.params;
      res.json(await calendarioService.generate(idPais, anio));
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/calendario/listar/:idPais/:anio", async (req, res, next) => {
    try {
      const { idPais, anio } = req.params;
      res.json(await calendarioService.listByCountryAndYear(idPais, anio));
    } catch (error) {
      next(error);
    }
  });
}

module.exports = { registerRoutes };
