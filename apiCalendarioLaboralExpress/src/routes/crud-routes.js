const express = require("express");

function createCrudRouter(service, options = {}) {
  const router = express.Router();

  router.get("/listar", async (_req, res, next) => {
    try {
      res.json(await service.list());
    } catch (error) {
      next(error);
    }
  });

  router.get("/obtener/:id", async (req, res, next) => {
    try {
      res.json(await service.get(req.params.id));
    } catch (error) {
      next(error);
    }
  });

  router.get("/buscar/:nombre", async (req, res, next) => {
    try {
      res.json(await service.search(req.params.nombre));
    } catch (error) {
      next(error);
    }
  });

  router.post("/agregar", async (req, res, next) => {
    try {
      const createMethod = options.create || service.create.bind(service);
      res.json(await createMethod(req.body));
    } catch (error) {
      next(error);
    }
  });

  router.put("/modificar", async (req, res, next) => {
    try {
      const updateMethod = options.update || service.update.bind(service);
      res.json(await updateMethod(req.body));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/eliminar/:id", async (req, res, next) => {
    try {
      res.json(await service.remove(req.params.id));
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = { createCrudRouter };
