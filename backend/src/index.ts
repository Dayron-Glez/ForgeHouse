import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { env } from "./config/env";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");

    app.listen(env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar la base de datos:", error);
    process.exit(1);
  });
