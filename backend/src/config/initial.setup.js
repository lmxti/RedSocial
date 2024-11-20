"use strict";
/* <----------------------- MODELOS --------------------------> */
const User = require("../models/user.model.js");
/**
 * Función asíncrona que crea usuarios por defecto en la base de datos.
 * 
 * En caso de que no existan usuarios en la coleccion de usuarios (`User`), se crean dos
 * usuarios default con el rol `usuario` y `administrador` respectivamente.
 * 
 * @returns {Promise<void>} La función no retorna un valor explícito, pero notifica creacion de usuarios.
 */
async function createDefaultUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new User({
        name: "John",
        lastName: "Doe",
        username: "JDoe",
        password: await User.encryptPassword("JDoe123"),
        email: "jdoe@example.com", 
        role: "usuario",
      }).save(),
      new User({
        name: "Jane",
        lastName: "Doe",
        username: "JaneDoe",
        password: await User.encryptPassword("JDoe123"),
        email: "janedoe@example.com",
        role: "administrador",
      }).save()
    ]);
    console.log("⚙️ [SETUP] initial.setup -> createDefaultUsers: Usuario default creados");
  } catch (error) {
    console.log("error: initial.setup -> createDefaultUsers: ", error);
  };
};

module.exports = {
  createDefaultUsers,
};
