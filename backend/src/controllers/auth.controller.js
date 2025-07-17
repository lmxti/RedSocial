/* <----------------------- SERVICIOS ------------------------> */
const AuthService = require("../services/auth.service.js");
/* <----------------------- SCHEMA ------------------------> */
const { authLoginBodySchema } = require("../schemas/auth.schema.js");
/* <----------------------- FUNCIONES ------------------------> */
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Controlador que maneja y valida la solicitud de inicio de sesion.
 *
 * @param {Object} req - Objecto de solicitud.
 * @param {Object} req.body - Cuerpo de la solicitud que contiene las credenciales de inicio de sesión.
 * @param {string} req.body.username - Nombre de usuario del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta .
 * @returns {Promise<void>} - Responde la solicitud con el token de usuario o mensaje de error.
 */
async function login(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = authLoginBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [accessToken, refreshToken, errorToken] = await AuthService.login(
      body
    );
    if (errorToken) return respondError(req, res, 400, errorToken);
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });33
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });
    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 400, error.message);
  }
}
/**
 * Controlador para manejar la solicitud de actualización del token de acceso.
 * Verifica la existencia de un token de refresco en las cookies, lo utiliza para generar un nuevo token de acceso y responde con éxito.
 * @async
 * @param {Object} req - Objeto de solicitud .
 * @param {Object} req.cookies - Cookies de la solicitud que pueden contener el token de refresco (`jwt`).
 * @param {Object} res - Objeto de respuesta .
 * @returns {Promise<void>} - No devuelve un valor directo, responde a la solicitud HTTP.
 */
async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");

    const [accessToken, errorToken] = await AuthService.refresh(cookies);
    if (errorToken) return respondError(req, res, 400, errorToken);

    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> refresh");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Controlador para manejar el cierre de sesión del usuario.
 * @param {Object} req - Objeto de solicitud HTTP de Express.
 * @param {Object} req.cookies - Cookies de la solicitud que pueden contener el token de refresco (`jwt`).
 * @param {Object} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} - No devuelve un valor directo, responde a la solicitud HTTP.
 */
async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return respondError(req, res, 400, "No hay token existente");

    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, { message: "Sesion cerrada correctamente" });
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  login,
  refresh,
  logout,
};
