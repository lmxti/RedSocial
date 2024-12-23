/* <----------------------- MODELOS --------------------------> */
const Tag = require("../models/tag.model.js");
/* <----------------------- MODULOS --------------------------> */
const mongoose = require('mongoose');

/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler.js");
/* <--------------------- V. DE ENTORNO ----------------------> */

/* <---------------------- UTILIDADES  -----------------------> */
function normalizeTag(name){
  return name.toLowerCase().replace(/\s+/g, '');
};

/**
 * Servicio encargado de manejar la creación de tag(etiqueta).
 * 
 * @async
 * @param {Object} tag - Objeto que contiene los campos requeridos para crear tag(etiqueta).
 * @param {Object} tag.name - Nombre de tag(etiqueta).
 * @returns {Promise<Array>} - Array que que puede ser:
 *  - {Object|null} El nuevo tag(etiqueta) creado en caso de operacion exitosa.
 *  - {null|string} Un mensaje de error en caso de que ocurra un error.
 */
async function createTag(tag) {
  try {
    const { name } = tag;
    const normalizedTag = normalizeTag(name);
    const tagExist = await Tag.findOne({ name: normalizedTag });
    if (tagExist) return [null, "Ya existe un tag con el mismo nombre"];
    const newTag = new Tag({ name: normalizedTag });
    await newTag.save();
    return [newTag, null];
  } catch (error) {
    handleError(error, "tag.service -> createTag");
  };
};

/**
 * Servicio encargado de obtener todos las tags(etiquetas).
 * 
 * @async
 * @returns {Promise<Array>} - Array que puede ser:
 *  - {Array<Object>|null} Lista de tags(etiquetas) en caso de operación exitosa.
 *  - {null|string} Mensaje de error en caso de que no se encuentren tags(etiquetas) o ocurra un problema.
 */
async function getTags(){
  try {
    const tags = await Tag.find();
    if(!tags) return [null, "No se encontraron tags"];
    return [tags, null];
  } catch (error) {
    handleError(error, "tag.service -> getTags");
  };
};

/**
 * Servicio encargado de obtener un tag(etiqueta) por su ID.
 * 
 * @async
 * @param {string} id - ID del tag(etiqueta) a buscar.
 * @returns {Promise<Array>} - Array que puede ser:
 *  - {Object|null} La tag(etiqueta) encontrado en caso de operación exitosa.
 *  - {null|string} Mensaje de error en caso de que no se encuentre la tag(etiqueta) o ocurra un problema.
 */
async function getTagByID(id) {
  try {
    const tagFound = await Tag.findById(id);
    if(!tagFound) return [null, "No se encontro tag asociado a id ingresado"];
    return [tagFound, null];
  } catch (error) {
    handleError(error, "tag.service -> getTagByID");
  };
};

/**
 * Servicio encargado de actualizar un tag(etiqueta) por su ID.
 * 
 * @async
 * @param {string} id - ID de la tag(etiqueta) a actualizar.
 * @param {Object} body - Objeto que contiene los datos actualizados de la tag(etiqueta).
 * @param {string} body.name - Nuevo nombre de la tag(etiqueta).
 * @returns {Promise<Array>} - Array que puede ser:
 *  - {Object|null} La tag(etiqueta) actualizado en caso de operación exitosa.
 *  - {null|string} Mensaje de error en caso de que ocurra un problema.
 */
async function updateTag(id, body) {
  try {
    const tagFound = await Tag.findById(id);
    if(!tagFound) retrun [null, "No existe tag asociado al id ingresado"];
    const { name } = body;
    const normalizedTag = normalizeTag(name);
    if(tagFound.name === normalizedTag)return [null, "El nombre de tag es el mismo"];
    const tagExist = await Tag.findOne({name: normalizedTag});
    if(tagExist && tagExist._id.toString() !== id) return [null, "Ya existe un tag con el mismo nombre"];
    tagFound.name = normalizedTag;
    await tagFound.save();
    return [tagFound, null];
  } catch (error) {
    handleError(error, "tag.service -> updateTag");
  };
};

/**
 * Servicio encargado de eliminar una tag(etiqueta) por su ID.
 * @async
 * @param {string} id - ID del tag(etiqueta) a eliminar.
 * @returns {Promise<Array>} - Array que puede ser:
 *  - {Object|null} La tag(etiqueta) eliminado en caso de operación exitosa.
 *  - {null|string} Mensaje de error en caso de que no se encuentre el tag o ocurra un problema.
 */
async function deleteTag(id) {
  try {
    const tagFound = await Tag.findByIdAndDelete(id);
    if(!tagFound) return [null, "No existe etiqueta (tag) asociado al id ingresado"];
    return [tagFound, null];
  } catch (error) {
    handleError(error, "tag.service -> deleteTag");
  };
};

/**
 * Funcion encargada de procesar una lista de tags(etiquetas) para incorporarlas a un post.
 * 
 * @param {Array<string|ObjectId>} tags - Lista de arrays que pueden ser en formato objetoId o string.
 * @returns  {Promise<Array>} - Array que puede ser:
 *  - {Array<ObjectId>|null} Lista de IDs de tags en caso de operación exitosa.
 *  - {null|string} Mensaje de error en caso de que ocurra un problema.
 */
async function processTags(tags) {
  try {
    const hashtagsIDs = [];
    if (tags && tags.length > 0) {
      for (let tag of tags) {
        // Si el tag es de tipo objectId
        if (mongoose.Types.ObjectId.isValid(tag)) {
          const tagFound = await Tag.findById(tag);
          if (!tagFound) return [null, "No existe tag asociado al id ingresado"];
          hashtagsIDs.push(tagFound._id);

        } 
        // Si el tag es de tipo string
        else {
          let tagFound = await Tag.findOne({ name: normalizeTag(tag) });
          if (!tagFound) {
            const [newTag, newTagError] = await createTag({ name: tag });
            if (newTagError) return [null, newTagError];
            hashtagsIDs.push(newTag._id);
          } else {
            hashtagsIDs.push(tagFound._id);
          }
        }
      }
    } else {
      let defaultTag = await Tag.findOne({ name: "general" });
      if (!defaultTag) {
        const [newTag, newTagError] = await createTag({ name: "general" });
        if (newTagError) return [null, newTagError];
        hashtagsIDs.push(newTag._id);
      } else {
        hashtagsIDs.push(defaultTag._id);
      }
    }
    
    return [hashtagsIDs, null];
  } catch (error) {
    handleError(error, "tag.service -> processTags");
    return [null, "Error procesando los tags"];
  }
}

module.exports = {
  createTag,
  getTags,
  getTagByID,
  updateTag,
  deleteTag,
  processTags
};
