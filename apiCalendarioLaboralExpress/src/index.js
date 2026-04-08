const { createApp } = require("./app");
const { connectToDatabase } = require("./config/database");
const { env } = require("./config/env");

async function start() {
  await connectToDatabase();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`API Express escuchando en http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error("No fue posible iniciar la API:", error);
  process.exit(1);
});
