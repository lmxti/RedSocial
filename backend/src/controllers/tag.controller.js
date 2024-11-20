/* <----------------------- SERVICIOS ------------------------> */
const TagService = require("../services/tag.service.js");
/* <----------------------- SCHEMA ------------------------> */
const { tagBodySchema } = require("../schemas/tag.schema.js");
/* <----------------------- FUNCIONES ------------------------> */
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");
const Tag = require("../models/tag.model.js");

/**
 * Controlador que maneja y valida la solicitud de creacion de tag(etiqueta).
 * 
 * @async
 * @param {Object} req - Objecto de solicitud .
 * @param {Object} req.body - Cuerpo de solicitud que contiene atributos de tag(etiqueta) a crear.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 *  - En caso de éxito: Respuesta con estado "Success"|201 y los datos de la tag(etiqueta) creada.  
 *  - En caso de error: Respuesta con estado "Error"/400 mensaje descriptivo y detalles opcionales del error.
 */
async function createTag(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } =  tagBodySchema.validate(body)
        if(bodyError) return respondError(req, res, 400, bodyError.message);
        const [newTag, newTagError] = await TagService.createTag(body);
        if(newTagError) return respondError(req, res, 400, newTagError);
        if(!newTag) return respondError(req, res, 400, "No se creo tag");
        respondSuccess(req, res, 201, newTag);
    } catch (error) {
        handleError(error, "tag.controller -> createTag");
        respondError(req, res, 400, "Error interno del servidor");
    };
};

/**
 * Controlador que maneja la solicitud para traer todas los tags(etiquetas).
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 *  - En caso de éxito: Respuesta con estado "Success"|200 y un array de tags(etiquetas), o un mensaje indicando que no hay tags(etiquetas) disponibles.  
 *  - En caso de error: Respuesta con estado "Error"/400 mensaje descriptivo y detalles opcionales del error.
 */
async function getTags(req, res) {
    try {
        const [tags, tagsError] = await TagService.getTags();
        if(tagsError) return respondError(req, res, 400, tagsError);
        if(!tags) return respondError(req, res, 400, "No se pudieron obtener tags");
        tags.length === 0
         ? respondSuccess(req, res, 200, { message: "No existen etiquetas (tags) actualmente"})
         : respondSuccess(req, res, 200, { message: "Se encontraron los siguientes tags", data: tags})
    } catch (error) {
        handleError(error, "tag.controller -> getTags");
        respondError(req, res, 400, "Error interno del servidor");
    };
};

/**
 * Controlador que maneja la solicitud para obtener un tag(etiqueta) por su ID.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.params.id - ID de la  tag(etiqueta) a buscar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 *  - En caso de éxito: Respuesta con estado "Success"|200 y los datos de la tag(etiqueta) encontrada.  
 *  - En caso de error: Respuesta con estado "Error"/400 mensaje descriptivo y detalles opcionales del error.
 */
async function getTagByID(req, res) {
    try {
        const { id } = req.params;
        const [tag, tagError] = await TagService.getTagByID(id);
        if(tagError) return respondError(req, res, 400, tagError);
        if(!tag) return respondError(req, res, 400, "No se encontro tag");
        respondSuccess(req, res, 200, {message: "Se encontro el siguiente tag: ", data:tag})
    } catch (error) {
        handleError(error,"tag.controller -> getTagByID");
        respondError(req, res, 400, "Error interno del servidor");
    };
};

/**
 * Controlador que maneja y valida la solicitud para actualizar atributos de una etiqueta(tag).
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.params.id - ID de la tag(etiqueta) a actualizar.
 * @param {Object} req.body - Cuerpo de solicitud que contiene atributos de tag(etiqueta) a actualizar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 *  - En caso de éxito: Respuesta con estado "Success"|200 y los datos de la tag(etiqueta) actualizada.  
 *  - En caso de error: Respuesta con estado "Error"/400 mensaje descriptivo y detalles opcionales del error.
 */
async function updateTag(req, res) {
    try {
        const { id } = req.params;
        const {body} = req;
        const { error: bodyError} = tagBodySchema.validate(body);
        if(bodyError) return respondError(req, res, 400, bodyError.message);
        const [tag, tagError] = await TagService.updateTag(id, body);
        if(tagError) return respondError(req, res, 409, tagError);
        if(!tag) return respondError(req, res, 400, "No se encontro tag asociado al id ingresado");
        respondSuccess(req, res, 200, { message: "Tag actualizado", data: tag});
    } catch (error) {
        handleError(error, "tag.controller -> updateTag");
        respondError(req, res, 400, `Error interno del servidor ${error}`);
    };
};

/**
 * Controlador que maneja la solicitud para eliminar una tag(etiqueta).
 * 
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.params.id - ID de tag(etiqueta) a eliminar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 *  - En caso de éxito: Respuesta con estado "Success"|200 y los datos de la tag(etiqueta) eliminada.  
 *  - En caso de error: Respuesta con estado "Error"/400 mensaje descriptivo y detalles opcionales del error.
 */
async function deleteTag(req, res) {
    try {
        const { id } = req.params;
        const [tag, tagError] = await TagService.deleteTag(id);
        if(tagError) return respondError(req, res, 400, tagError);
        if(!tag) return respondError(req, res, 400, "No se encontro etiqueta(tag) asociado al id ingresado");
        respondSuccess(req, res, 200, { message: "Etiqueta (tag) eliminada correctamente", data: tag});
    } catch (error) {
        handleError(error, "tag.controller -> deleteTag");
        respondError(req, res, 500, "Error interno del servidor");
    };
};

module.exports = {
    createTag,
    getTags,
    getTagByID,
    updateTag,
    deleteTag
};