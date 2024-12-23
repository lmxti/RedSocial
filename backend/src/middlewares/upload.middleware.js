/* <----------------------- MODELOS --------------------------> */

/* <----------------------- MODULOS --------------------------> */
const multer = require("multer");
const path = require("path");
const uuid = require('uuid');
/* <----------------------- FUNCIONES ------------------------> */
const { respondError, handleError  } = require("../utils/resHandler.js");


/**
 * Configuración de multer para subir imagen de perfil de usuarios
 * 
 * @type {disk  StorageEngine} - Almacenamiento de archivos en disco.
 * @property {Function} destination - Directorio de destino.
 * @property {Function} filename - Nombre del archivo.
 * @returns {diskStorage}
 */
const profileStorage = multer.diskStorage({
    destination: (req, file, cb ) =>{
        cb(null, 'src/uploads/profile_pictures');
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        cb(null, `${uuid.v4()}.${extension}`);
    }
});

/**
 * Configuracion de multer para subir imagen(es) de publicacion
 *  
 * @type {disk  StorageEngine} - Almacenamiento de archivos en disco.
 * @property {Function} destination - Directorio de destino.
 * @property {Function} filename - Nombre del archivo.
 * @returns {diskStorage}
 */
const postStorage = multer.diskStorage({
    destination: (req, file, cb ) =>{
        cb(null, 'src/uploads/post_images');
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        cb(null, `${uuid.v4()}.${extension}`);
    }
});

/**
 *  Funcion para filtrar archivos por tipo de imagen.
 * 
 * @param {*} req - Objeto de solicitud.
 * @param {*} file - Archivo a subir.
 * @param {*} cb - Callback
 * @returns  {Function} - Callback
 */
const imagesFilter = (req, file, cb) => {
    try {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'), false);
        }
    } catch (error) {
        return handleError(error, "upload.middleware -> imagesFilter");
    }
};

/*<----------------------------------- MIDDLEWARES ----------------------------------->*/
const uploadProfile = multer({ storage: profileStorage, fileFilter: imagesFilter});
const uploadImages = multer({ storage: postStorage });

module.exports = {
    uploadProfile,
    uploadImages
}