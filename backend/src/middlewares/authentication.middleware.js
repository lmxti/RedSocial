"use strict"
/* <----------------------- MODULOS --------------------------> */
const jwt = require("jsonwebtoken");
/* <--------------------- V. DE ENTORNO ----------------------> */
const { ACCESS_JWT_SECRET } = require("../config/env.config.js");

/* <----------------------- FUNCIONES ------------------------> */
const { respondError, handleError  } = require("../utils/resHandler.js");

/**
 * Middleware de autenticacion, verifica la validez del token JWT en la cabecera de autorizacion.
 *  Si el token es valido, almacena la informacion de `email` y `role` en la solicitud (req) para su uso posterior en la solicitud
 * @function isAuthenticated
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función que permite pasar al siguiente middleware.
 * @returns {Object|void} - Si el token es inválido o no está presente, responde con un error; de lo contrario, llama a `next()` para continuar.
 */
async function isAuthenticated(req, res, next) {
    try {
        
        const token = req.cookies?.jwt;

        if (!token) {
            return respondError(req, res, 401, "No autorizado, token no encontrado");
        }

        jwt.verify(token, ACCESS_JWT_SECRET, (error, decoded) =>{            
            if (error) {
                return respondError(req, res, 403, "No autorizado", error.message);
            };
            console.log(decoded);
            
            // req.username = decoded.username;
            req.role = decoded.role;
            // Almacenamiento de id de usuario en solicitud
            req.id = decoded.id;            
            
            next();
        });
    } catch (error) {
        handleError(error, "authentication.middleware -> isAuthenticated");
    };
};

module.exports = isAuthenticated;
