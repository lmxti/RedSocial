/* <----------------------- MODULOS --------------------------> */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
/* <----------------------- Rutas --------------------------> */
const indexRoutes = require("./routes/index.routes.js");
/* <----------------------- FUNCIONES ------------------------> */
const { setupDB } = require("./config/db.config.js");
const { createDefaultUsers } = require("./config/initial.setup.js");
/* <--------------------- V. DE ENTORNO ----------------------> */
const { PORT, URL_FRONTEND } = require("./config/env.config.js");

/* <----------------------- WEB SOCKET --------------------------> */
const { initializeSockets } = require("./config/socket.config");
const http = require("http");

async function setupServer() {
  try {
    const server = express();
    const httpServer = http.createServer(server);
    server.use(express.json());
    server.use(cors({ origin: URL_FRONTEND, credentials: true }));
    server.use(cookieParser());
    server.use(morgan("dev"));
    server.use(express.urlencoded({ extended: true }));
    server.use("/api", indexRoutes);
    server.use("/uploads", express.static(path.join(__dirname, "uploads")));

    const io = initializeSockets(httpServer)

    httpServer.listen(PORT, () => {
      console.log(`✅ [INFO] El servidor y Socket.IO está corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.log("Error", error);
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createDefaultUsers();
    console.log(
      "✅ [SUCCESS] setupAPI -> API web, Servidor y configuración predeterminada exitosa"
    );
  } catch (error) {
    console.log("setupAPI => Error -> Ocurrio un error: ", error);
  }
}

setupAPI();
