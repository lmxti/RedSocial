/* <----------------------- MODULOS --------------------------> */
const mongoose = require("mongoose");
/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler.js");
/* <--------------------- V. DE ENTORNO ----------------------> */
const { DB_URL } = require("./env.config.js");

const options = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
};

/**
 * Establece la conexión a la base de datos MongoDB utilizando Mongoose.
 *  - Utiliza la URL de conexión especificada en las variables de entorno.
 *  - Si la conexión es exitosa, muestra un mensaje en la consola.
 *  - Si ocurre un error, se registra y maneja con el controlador de errores.

 * @returns {Promise<void>} - No devuelve varlo directo, inicializa la conexión a la base de datos.
 * @throws {Error} - Lanza un error en caso de que falle la conexión a la base de datos.
 */
async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("✅ [SUCCESS] Conexión exitosa a la base de datos");
  } catch (error) {
    handleError(error, "/db.config -> setupDB");
  };
};

module.exports = { setupDB };
