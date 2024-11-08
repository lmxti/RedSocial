"use strict";
/* <----------------------- MODULOS --------------------------> */
const Joi = require("joi");

const authLoginBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username no puede estar vacio",
    "any.required": "Username es obligatorio",
    "string.base": "Username debe ser tipo string",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contrasena no puede estar vacia",
    "any.required": "La contrasena es obligatoria",
    "string.base": "La contrasena debe ser tipo string",
  }),
}).messages({
  "object.unknow": "No se permiten campos adicionales",
});

module.exports = {
  authLoginBodySchema,
};
