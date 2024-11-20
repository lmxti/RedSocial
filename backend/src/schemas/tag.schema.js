"use strict"
/* <----------------------- MODULOS --------------------------> */
const Joi = require("joi");

const tagBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre de tag (etiqueta) no puede estar vacio",
    "any.required": "El nombre de tag (etiqueta) es un campo requerido",
    "string.base": "El nombre de tag (etiqueta) debe ser tipo string"
  }).messages({
    "object.unknow": "No se permiten campos adicionales/desconocidos"
  })
})

module.exports = { tagBodySchema };