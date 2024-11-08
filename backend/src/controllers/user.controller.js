/* <----------------------- SERVICIOS ------------------------> */
const UserService = require("../services/user.service.js");
/* <----------------------- SCHEMA ------------------------> */
const { userBodySchema, userUpdateSchema } = require("../schemas/user.schema.js");
/* <----------------------- FUNCIONES ------------------------> */
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Controlador para crear un nuevo usuario en el sistema
 * @param {Object} req - Objeto de solicitud
 * @param {Object} req.body - Cuerpo de la solicitud que contiene los campos necesarios para crear usuario
 * @param {Object} res - Objeto de respuesta
 * @returns  {Promise<void>} - Responde la solicitud con datos de usuario creado o error
 */
async function createUser(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [newUser, newUserError] = await UserService.createUser(body);
    if (newUserError) return respondError(req, res, 400, newUserError);
    if (!newUser) return respondError(req, res, 400, "No se creo usuario");
    respondSuccess(req, res, 201, newUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "No se creo usuario");
  }
};

/**
 * Controlador para obtener todos los usuarios.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} - Responde la solicitud con la lista de usuarios o un mensaje de error.
 */
async function getUsers(req, res) {
  try {
    const [users, usersError] = await UserService.getUsers();
    if (usersError) return respondError(req, res, 400, "Error al buscar usuarios (UserService.getUsers()");
    users.length === 0
      ? respondSuccess(req, res, 200, "No existen usuarios en la BD")
      : respondSuccess(req, res, 200, { message: "Se encontraron los siguientes usuarios: ", data: users });
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    respondError(req, res, 500, "Error al buscar usuarios");
  };
};

/**
 * Controlador para actualizar un usuario.
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del usuario (extraído de req.params).
 * @param {Object} req.body - Contiene los datos del usuario para actualizar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} - Responde la solicitud con los datos de usuario actualizado o un mensaje de error.
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;    

    const { error: bodyError } = userUpdateSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [ user, userError ] = await UserService.updateUser(id, body);
    
    if(userError) return respondError(req, res, 400, userError);
    if(!user) return respondError(req, res, 400, "No se encontro usuario asociado al id ingresado");
    respondSuccess(req, res, 200, { message: "Usuario actualizado", data: user});
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "Error al actualizar usuario");
  }
};

/**
 * Controlador para eliminar un usuario del sistema
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del usuario a eliminar (extraído de req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} - Responde con el usuario eliminado o un mensaje de error.
 */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const [ user, userError] = await UserService.deleteUser(id);
    if(userError) return respondError(req, res, 400, userError);
    if(!user) return respondError(req, res, 400, "No se encontro usuario asociado al id ingresado");
    respondSuccess(req, res, 200, { message: "Usuario eliminado", data: user});
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "Error al eliminar usuario");
  };
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
