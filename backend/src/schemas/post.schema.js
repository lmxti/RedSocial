"use strict"
/* <----------------------- MODULOS --------------------------> */
const Joi = require("joi");

const postBodySchema = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "El titulo no puede estar vacio",
        "any.required": "El titulo es obligatorio",
        "string.base" : "El titulo debe ser tipo string"
    }),
    description: Joi.string().required().messages({
        "string.empty": "La descripcion no puede estar vacia",
        "any.required": "La descripcion es obligatorio",
        "string.base" : "La descripcion debe ser tipo string"
    }),
    media: Joi.array().items(Joi.string().uri()).optional().messages({
        "array.base": "Los medios deben ser un array",
        "string.uri": "Cada medio debe ser una URL válida",
    }),
    author: Joi.string().required().messages({
        "string.empty": "El autor es obligatorio",
        "any.required": "El autor es obligatorio",
        "string.base": "El autor debe ser tipo string (ID de usuario)",
    }),
    likes: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Likes deben ser un array de ID de usuarios",
    }),
    shares: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Shares deben ser un array de ID de usuarios",
    }),
    visibility: Joi.string().valid("public", "private", "followers").default("public").messages({
        "string.base": "La visibilidad debe ser un valor tipo string",
        "any.only": "La visibilidad debe ser uno de los siguientes valores: 'public', 'private', 'followers'",
    }),
});


module.exports = postBodySchema;