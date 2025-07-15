"use strict"
/* <----------------------- MODULOS --------------------------> */
const Joi = require("joi");
const { updatePost } = require("../services/post.service");

const postBodySchema = Joi.object({
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
    tags: Joi.array().items(
        Joi.string().messages({
            "string.base": "Cada etiqueta debe ser de tipo string",
        })
    ).optional().messages({
        "array.base": "Tags debe ser un array de IDs de etiquetas"
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

const postUpdateSchema = Joi.object({
    description: Joi.string().optional().messages({
        "string.base": "La descripción debe ser un texto válido",
    }),
    visibility: Joi.string().valid("public", "private", "followers").optional().messages({
        "string.base": "La visibilidad debe ser un texto válido",
        "any.only": "La visibilidad debe ser uno de los siguientes valores: 'public', 'private', 'followers'",
    }),
    tags: Joi.array().items(
        Joi.string().messages({
            "string.base": "Cada etiqueta debe ser un texto válido",
        })
    ).optional().messages({
        "array.base": "Tags debe ser un array de etiquetas",
    }),
});


module.exports = {postBodySchema , postUpdateSchema};