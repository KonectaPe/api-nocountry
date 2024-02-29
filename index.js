import express, { json, urlencoded } from "express";
import cors from "cors";
import { connectionDb } from "./src/configs/db.js";
import { PORT } from "./src/configs/environments.js";
import router from "./src/routes/app.route.js";

const app = express();

//configurando cors
app.use(cors({ origin: "*" }));

//configurando servidor
app.use(urlencoded({ extended: true }));
app.use(json());

//configurando base de datos
await connectionDb();

//configurando rutas
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});
