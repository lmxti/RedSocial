/* <----------------------- MODELOS --------------------------> */
const User = require("../models/user.model.js");
/* <----------------------- MODULOS --------------------------> */
const jwt = require("jsonwebtoken");
/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler");
/* <--------------------- V. DE ENTORNO ----------------------> */
const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require("../config/env.config");
const { respondError, respondSuccess } = require("../utils/resHandler");

/**
 * Servicio encargado de manejar el inicio de sesion de usuario, generando y devolviendo tokens de autenticacion
 * @async
 * @param {Object} credentials - Objeto que contiene los campos 'username' y 'password'.
 * @param {string} credentials.username - Nombre de usuario del usuario que intenta iniciar sesión.
 * @param {string} credentials.password - Contraseña del usuario.
 * @returns {Promise<Array>} - Un array que contiene:
 *   - {string|null} accessToken - Token de acceso, `null` si falla el inicio de sesión.
 *   - {string|null} refreshToken - Token de refresco, `null` si falla el inicio de sesión.
 *   - {string|null} error - Mensaje de error en caso de fallo, `null` si el inicio de sesión es exitoso.
 */
async function login(credentials) {
  try {
    const { username, password } = credentials;
    const userFound = await User.findOne({ username: username })
      .populate("role")
      .exec();
    if (!userFound)
      return [null, null, "Nombre de usuario ingresado no existe"];
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) return [null, null, "Contrasena ingresada erronea"];
    const accessToken = jwt.sign(
      { username: userFound.username, role: userFound.role, id: userFound._id },
      ACCESS_JWT_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { username: userFound.username },
      REFRESH_JWT_SECRET,
      { expiresIn: "7d" }
    );
    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> login");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Servicio encargado de manejar el cierre de sesión de un usuario.
 * Verifica la existencia de un token de refresco en las cookies, lo elimina si está presente, y responde con un mensaje de éxito.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.cookies - Cookies enviadas en la solicitud, que pueden contener el token de refresco (`jwt`).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} - No devuelve un valor directo, responde a la solicitud HTTP.
 */
async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No existe token");
    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, {
      message: "Sesion finalizada correctamente",
    });
  } catch (error) {
    handleError(error, "auth.service -> logout");
    respondError(req, res, 400, error.message);
  }
}
/**
 * Servicio para generar un nuevo token de acceso utilizando un token de refresco.
 * Verifica la validez del token de refresco y, si es válido, busca al usuario correspondiente y genera un nuevo token de acceso.
 * @async
 * @param {Object} cookies - Objeto que contiene las cookies del cliente, incluido el token de refresco (`jwt`).
 * @returns {Promise<[string|null, string|null]>} - Retorna un array con el nuevo token
 */
async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err)
          return [null, "La sesion ha cadudado, vuelva a iniciar sesion"];
        const userFound = await User.findOne({ username: user.username })
          .populate("roleUser")
          .exec();
        if (!userFound) return [null, "No se encontro usuario autorizado"];

        const accessToken = jwt.sign(
          { username: userFound.username, roleUser: userFound.role },
          ACCESS_JWT_SECRET,
          { expiresIn: "1d" }
        );
        return [accessToken, null];
      }
    );
    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

module.exports = {
  login,
  logout,
  refresh,
};
