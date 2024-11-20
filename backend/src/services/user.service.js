/* <----------------------- MODELOS --------------------------> */
const User = require("../models/user.model.js");
/* <----------------------- MODULOS --------------------------> */

/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler.js");

/* <--------------------- V. DE ENTORNO ----------------------> */

/* <---------------------- UTILIDADES  -----------------------> */

/**
 * Servicio encargado de crear un nuevo usuario.
 * 
 * @async
 * @param {Object} user - Objeto que contiene los datos del nuevo usuario.
 * @param {string} user.name - Nombre del usuario.
 * @param {string} user.lastName - Apellido del usuario.
 * @param {string} user.username - Nombre de usuario.
 * @param {string} user.password - Contraseña del usuario.
 * @param {string} user.email - Correo electrónico del usuario.
 * @returns {Promise<Array>} - Array que puede ser:
 *  - [Object|null, null] El nuevo usuario creado en caso de operación exitosa.
 *  - [null, string] Mensaje de error en caso de que ocurra un error.
 */
async function createUser(user) {
  try {
    const { name, lastName, username, password, email } = user;
    const userNameExists = await User.findOne({ username });
    if (userNameExists)  return [null, "El nombre de usuario ya se encuentra registrado"];
    const emailExists = await User.findOne({email});
    if (emailExists)  return [null, "El correo electrónico ya se encuentra registrado"];
    const newUser = new User({
      name,
      lastName,
      username,
      password: await User.encryptPassword(password),
      email
    });
    await newUser.save();
    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

/**
 * Servicio encargado de obtener todos los usuarios.
 * 
 * @async
 * @returns {Promise<Array>} - Array que puede ser:
 *  - [Array<Object>|null, null] Lista de usuarios en caso de operación exitosa.
 *  - [null, string] Mensaje de error en caso de que no se encuentren usuarios o ocurra un problema.
 */
async function getUsers() {
  try {
    const users = await User.find().populate("role").exec();
    if (!users) return [null, "No se encontraron usuarios"];
    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

/**
 * Servicio encargado de obtener un usuario por su ID.
 * 
 * @async
 * @param {string} id - ID del usuario a obtener.
 * @returns {Promise<Array>} - Array que puede ser:
 *  - [Object|null, null] El usuario encontrado en caso de operación exitosa.
 *  - [null, string] Mensaje de error en caso de que no se encuentre el usuario o ocurra un problema.
 */
async function getUserByID(id) {
  try {
    const user = await User.findById(id);
    if(!user) return [null, "No se encontro usuario asociado al id"];
    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByID");
  };
};

/**
 * Servicio encargado de actualizar un usuario por su ID.
 * 
 * @async
 * @param {string} id - ID del usuario a actualizar.
 * @param {Object} body - Objeto que contiene los nuevos datos del usuario.
 * @param {string} body.name - Nuevo nombre del usuario.
 * @param {string} body.lastName - Nuevo apellido del usuario.
 * @param {string} body.username - Nuevo nombre de usuario.
 * @param {string} body.password - Nueva contraseña del usuario.
 * @param {string} body.email - Nuevo correo electrónico del usuario.
 * @param {string} body.role - Nuevo rol del usuario.
 * @returns {Promise<Array>} - Array que puede ser:
 *  - [Object|null, null] El usuario actualizado en caso de operación exitosa.
 *  - [null, string] Mensaje de error en caso de que ocurra un problema.
 */
async function updateUser(id, body) {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return [null, "No existe usuario asociado al id ingresado"];
    const { name, lastName, username, password, email, role } = body;
    const updateData = { name, lastName, role };
    if (username && username !== userFound.username) {
      const vacantUsername = await User.findOne({ username });
      if (vacantUsername) return [null, "El nombre de usuario ya se encuentra registrado"];
      updateData.username = username;
    }
    if(email && email !== userFound.email){
      const vacantEmail = await User.findOne({ email });
      if(vacantEmail) return [null, "El correo electrónico ya se encuentra registrado"];
      updateData.email = email;
    }
    if (password) updateData.password = await User.encryptPassword(password);
    const userUpdated = await User.findByIdAndUpdate(id, updateData, {new: true});
    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service- > updateUser");
  };
};

/**
 * Servicio encargado de eliminar un usuario por su ID.
 * 
 * @async
 * @param {string} id - ID del usuario a eliminar.
 * @returns {Promise<Array>} - Array que puede ser:
 *  - [Object|null, null] El usuario eliminado en caso de operación exitosa.
 *  - [null, string] Mensaje de error en caso de que no se encuentre el usuario o ocurra un problema.
 */
async function deleteUser(id) {
  try {
    const userFound = await User.findByIdAndDelete(id);
    if (!userFound) return [null, "No existe usuario asociado al id ingresado"];
    return [userFound, null];
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  };
};

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
};
