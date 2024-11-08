/* <----------------------- MODELOS --------------------------> */
const User = require("../models/user.model");
/* <----------------------- MODULOS --------------------------> */

/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler");

/* <--------------------- V. DE ENTORNO ----------------------> */

async function createUser(user) {
  try {
    const { name, username, password } = user;
    const UserExists = await User.findOne({ username });
    if (UserExists) {
      return [null, "Ya existe este nombre de usuario"];
    }
    const newUser = new User({
      name,
      username,
      password: await User.encryptPassword(password),
    });
    await newUser.save();
    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

async function getUsers() {
  try {
    const users = await User.find().populate("role").exec();
    if (!users) return [null, "No se encontraron usuarios"];
    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

async function updateUser(id, body) {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return [null, "No existe usuario asociado al id ingresado"];
    const { name, username, password, role } = body;

    const updateData = { name, role };

    // Verificacion de disponibilidad de nombre
    if (username && username !== userFound.username) {
      const vacantUsername = await User.findOne({ username });
      if (vacantUsername) return [null, "El nombre de usuario ya esta en uso"];
      updateData.username = username;
    }

    // Encriptar contrasena si se intenta actualizar
    if (password) {
      updateData.password = await User.encryptPassword(password);
    }

    const userUpdated = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service- > updateUser");
  }
}

async function deleteUser(id) {
  try {
    const userFound = await User.findByIdAndDelete(id);
    if (!userFound) return [null, "No existe usuario asociado al id ingresado"];
    return [userFound, null];
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
