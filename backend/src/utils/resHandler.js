"use strict";
/**
 * Envia una respuesta de exito con el codigo de estado y los datos proporcionados
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {number} [statusCode=200] - Código de estado HTTP para la respuesta (por defecto 200).
 * @param {Object} [data={}] - Datos a enviar en la respuesta.
 * @returns {Object} - Respuesta JSON, con estado "Success" y datos proporcionados para respuesta.
 */
function respondSuccess(req, res, statusCode = 200, data = {}) {
  return res.status(statusCode).json({
    state: "Success",
    data,
  });
}
/**
 * Envía una respuesta de error con el código de estado, el mensaje y detalles adicionales.
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta.
 * @param {number} [statusCode=500] - Código de estado HTTP para la respuesta (por defecto 500).
 * @param {*} [message="Couldn't process the request"] - Mensaje detallado de error.
 * @param {Object} [details={}] - Detalles adicionales del error.
 * @returns {Object} - Respuesta JSON con estado "Error", mensaje y detalles del error.
 */
function respondError(
  req,
  res,
  statusCode = 500,
  message = "Couldn't process the request",
  details = {}
) {
  return res.status(statusCode).json({
    state: "Error",
    message,
    details,
  });
}
/**
 * Envía una respuesta de error interno del servidor con el código de estado y el mensaje proporcionado.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {number} [statusCode=500] - Código de estado HTTP para la respuesta (por defecto 500).
 * @param {string} [message="Couldn't process the request"] - Mensaje de error.
 * @returns {Object} - Respuesta JSON con estado "Error" y mensaje de error.
 */
function respondInternalError(
  req,
  res,
  statusCode = 500,
  message = "Couldnt process the request"
) {
  return res.status(statusCode).json({
    state: "Error",
    message,
  });
}

module.exports = { respondSuccess, respondError, respondInternalError };
