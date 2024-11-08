"use strict";
/* <----------------------- MODULOS --------------------------> */
const Joi = require("joi");

const userBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacio",
    "any.required": "El nombre es obligatorio",
    "string.base": "El nombre debe ser tipo string",
  }),
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


const userUpdateSchema = userBodySchema.fork(['name', 'username', 'password'], (schema) => schema.optional());

module.exports = {
  userBodySchema,
  userUpdateSchema
};
