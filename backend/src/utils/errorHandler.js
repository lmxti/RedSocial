"use strict";

/**
 * Maneja errores fatales que causan la detención del servidor.
 * - Muestra un mensaje de error fatal en la consola.
 * - Registra el error completo.
 * - Detiene el servidor con `process.exit(1)`, indicando que ocurrió un error crítico.
 * 
 * @param {Error} error - El objeto de error que contiene la información del error fatal.
 * @param {string} msg - El mensaje que indica el lugar o contexto donde ocurrió el error fatal.
 */
function handleFatalError(error, msg) {
  console.log("[FATAL ERROR]: El servidor se apagara \n", msg);
  console.error(error);
  process.exit(1);
};

/**
 * Maneja errores generales que no requieren detener el servidor.
 * - Muestra un mensaje de error en la consola con la ubicación del error.
 * - Muestra el mensaje del error específico en consola.
 * 
 * @param {Error} error - El objeto de error que contiene la información del error.
 * @param {string} msg - El mensaje que indica el lugar o contexto donde ocurrió el error.
 */
function handleError(error, msg) {
  console.log("❌ [ERROR] A ocurrido un error en: \n📁", msg);
  console.error("🗯  " + error.message);
};

module.exports = {
  handleFatalError,
  handleError,
};
