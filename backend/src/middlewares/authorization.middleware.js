"use strict"
/* <----------------------- MODELOS --------------------------> */
const User = require("../models/user.model.js");
/* <----------------------- MODULOS --------------------------> */

/* <----------------------- FUNCIONES ------------------------> */
const { respondError, handleError  } = require("../utils/resHandler.js");

async function isAdmin(req, res, next) {
  try {
    const { username } = req;
    const userFound = await User.findOne({username: username});
    if(!userFound) return respondError(req, res, 404, "Usuario no encontrado");
    if(userFound.role !== "administrador"){
      return respondError(req, res, 403, "Acceso denegado, solo administradores");
    }
    next();
  } catch (error) {
    return handleError(error, "authorization.middleware -> isAdmin");
  }  
};


module.exports = isAdmin;