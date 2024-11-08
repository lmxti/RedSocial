/* <----------------------- SERVICIOS ------------------------> */

/* <----------------------- SCHEMA ------------------------> */
const { postBodySchema } = require("../schemas/post.schema.js");

/* <----------------------- FUNCIONES ------------------------> */
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");


async function createPost(req, res) {
    try {
        const { body } = req;
    } catch (error) {
        respondError(req, res, 500, "No se creo publicacion");
        handleError(error, "post.controller -> createPost");
    }
}


module.exports = {
    createPost
}