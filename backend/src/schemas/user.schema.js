"use strict";
/* <----------------------- MODULOS --------------------------> */
const Joi = require("joi");

const userBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacio",
    "any.required": "El nombre es obligatorio",
    "string.base": "El nombre debe ser tipo string",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacio",
    "any.required": "El apellido es obligatorio",
    "string.base": "El apellido debe ser tipo string",
  }),
  username: Joi.string().required().messages({
    "string.empty": "Username no puede estar vacio",
    "any.required": "Username es obligatorio",
    "string.base": "Username debe ser tipo string",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
    "string.base": "La contraseña debe ser tipo string",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) /*Validacion de formato */
    .required()
    .messages({
      "string.empty": "El correo no puede estar vacío",
      "any.required": "El correo es obligatorio",
      "string.base": "El correo debe ser tipo string",
      "string.email": "El correo debe tener un formato válido",
    }),
}).messages({
  "object.unknow": "No se permiten campos adicionales",
});

const userUpdateSchema = userBodySchema.fork(
  ["name", "lastName", "username", "password", "email"], 
  (schema) => schema.optional()
);

module.exports = {
  userBodySchema,
  userUpdateSchema,
};
