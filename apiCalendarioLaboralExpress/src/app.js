const express = require("express");
const cors = require("cors");

const { authMiddleware } = require("./middleware/auth");
const { errorHandler } = require("./middleware/error-handler");
const { registerRoutes } = require("./routes");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(authMiddleware);

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  registerRoutes(app);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
