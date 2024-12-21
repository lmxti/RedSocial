/* <----------------------- SERVICIOS ------------------------> */
const UserService = require("../services/user.service.js");
/* <----------------------- SCHEMA ------------------------> */
const { userBodySchema, userUpdateSchema } = require("../schemas/user.schema.js");
/* <----------------------- FUNCIONES ------------------------> */
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Controlador que maneja y valida la solicitud de creacion usuario(user)`.
 * 
*  @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Cuerpo de la solicitud que contiene los campos necesarios para crear user(usuario).
 * @param {Object} res - Objeto de respuesta.
 * @returns  {Promise<void>}
 *  - En caso de éxito: Respuesta con estado "Success" | 201 y los datos del usuario creado.  
 *  - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */
async function createUser(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [newUser, newUserError] = await UserService.createUser(body, req.file);
    if (newUserError) return respondError(req, res, 400, newUserError);
    if (!newUser) return respondError(req, res, 400, "No se creo usuario");
    respondSuccess(req, res, 201, newUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "Error interno del servidor");
  };
};

/**
 * Controlador que maneja la solicitud para obtener todos los users(usuarios) registrados.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} 
 *  - En caso de éxito: Respuesta con estado "Success" | 200 y un array de usuarios, o un mensaje indicando que no hay usuarios disponibles.  
 *  - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */
async function getUsers(req, res) {
  try {
    const [users, usersError] = await UserService.getUsers();
    if (usersError) return respondError(req, res, 400, "Error al buscar usuarios");
    users.length === 0
      ? respondSuccess(req, res, 200, "No existen usuarios registrados actualmente")
      : respondSuccess(req, res, 200, { message: "Se encontraron los siguientes usuarios: ", data: users });
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    respondError(req, res, 500, "Error interno del servidor");
  };
};

/**
 * Controlador que maneja la solicitud para obtener un usuario por su ID.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del usuario a buscar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} 
 *  - En caso de éxito: Respuesta con estado "Success" | 200 y los datos del usuario encontrado.  
 *  - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */
async function getUserByID(req, res) {
  try {
    const { id } = req.params;
    const [user, userError] = await UserService.getUserByID(id);
    if(userError) return respondError(req, res, 400, userError);
    if(!user) return respondError(req, res, 400, "No se encontro usuario");
    respondSuccess(req, res, 200, {message: "Se encontro el siguiente usuario", data: user});
  } catch (error) {
    handleError(error, "user.controller -> getUserByID");
    respondError(req, res, 400, "Error interno del servidor");
  }
}

/**
 * Controlador que maneja la solicitud para actualizar los atributos de un usuario.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del usuario a actualizar.
 * @param {Object} req.body - Cuerpo de solicitud con los atributos a actualizar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} 
 *  - En caso de éxito: Respuesta con estado "Success" | 200 y los datos del usuario actualizado.  
 *  - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
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
    respondError(req, res, 500, "Error interno del servidor");
  }
};

/**
 * Controlador que maneja la solicitud para eliminar un usuario.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del usuario a eliminar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} 
 *  - En caso de éxito: Respuesta con estado "Success" | 200 y los datos del usuario eliminado.  
 *  - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
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
    respondError(req, res, 500, "Error interno del servidor");
  };
};

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser
};
