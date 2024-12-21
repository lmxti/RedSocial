/* <----------------------- MODELOS --------------------------> */

/* <----------------------- MODULOS --------------------------> */
const multer = require("multer");
const path = require("path");
const uuid = require('uuid');
/* <----------------------- FUNCIONES ------------------------> */
const { respondError, handleError  } = require("../utils/resHandler.js");


// Configuracion para almacenar imagenes de perfil de usuario
const profileStorage = multer.diskStorage({
    destination: (req, file, cb ) =>{
        cb(null, 'src/uploads/profile_pictures');
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        cb(null, `${uuid.v4()}.${extension}`);
    }
});

const fileFilter = (req, file, cb) => {
    try {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'), false);
        }
    } catch (error) {
        return handleError(error, "upload.middleware -> fileFilter");
    }
};

// Middleware para subir archivos
const uploadProfile = multer({ storage: profileStorage, fileFilter: fileFilter});

module.exports = {
    uploadProfile
}