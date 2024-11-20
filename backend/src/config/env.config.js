"use strict";
/* <----------------------- MODULOS --------------------------> */
const path = require("path");
const dotenv = require("dotenv");
/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler.js")

/*  Resuelve(completa) la ruta completa del archivo `.env`
    - `__dirname` da la dirección de la carpeta donde está el archivo de código que estamos ejecutando.
    - `path.resolve() toma la direccion y agrega `.env` a ella para darte la ruta completa donde se encuentra el archivo .env.
*/
const envFilePath = path.resolve(__dirname, ".env");
/* A traves de dotenv se cargan las variables de entorno desde el archivo .env */

/* Carga las variables de entorno desde el archivo `.env` usando dotenv.
Si ocurre un error al cargar el archivo, muestra un mensaje de error. */
try {
  dotenv.config({ path: envFilePath });
} catch (error) {
  handleError(error, "env.config -> Error al cargar variables de entorno");
};

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
const URL_FRONTEND = process.env.URL_FRONTEND;

module.exports = {
  PORT,
  DB_URL,
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
  URL_FRONTEND
};


