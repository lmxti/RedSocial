/* <----------------------- SERVICIOS ------------------------> */
const PostService = require("../services/post.service.js");
/* <----------------------- SCHEMA ------------------------> */
const {
  postBodySchema,
  postUpdateSchema,
} = require("../schemas/post.schema.js");
/* <----------------------- FUNCIONES ------------------------> */
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Controlador encargado de manejar y validar la solicitud (body) de creacion de publicacion.
 *
 * @async
 * @param {Object} req - Objeto de solicitud
 * @param {Object} req.body - Cuerpo de solicitud que contiene atributos de publicacion a crear
 * @param {Object} req.id - Id del usuario que realiza la solicitud, incorporado por el middleware de autenticacion
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise<void>}
 * - En caso de exito: Respuesta con estado "Success" | 201 y los datos de la publicacion creada.
 * - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */
async function createPost(req, res) {
  try {
    const { body } = req;
    const { id: userId } = req;

    const postData = { ...body, author: userId };
    const { error: bodyError } = postBodySchema.validate(postData);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [newPost, newPostError] = await PostService.createPost(
      postData,
      req.files
    );
    if (newPostError) return respondError(req, res, 400, newPostError);
    if (!newPost) return respondError(req, res, 400, "No se creo publicacion");
    respondSuccess(req, res, 201, newPost);
  } catch (error) {
    handleError(error, "post.controller -> createPost");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Controlador que maneja la solicitud para obtener todas las publicaciones.
 *
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 * - En caso de exito: Respuesta con estado "Success" | 200 y un array de publicaciones, o un mensaje indicando que no hay publicaciones disponibles.
 * - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */

async function getPosts(req, res) {
  try {
    const [posts, postsError] = await PostService.getPosts();
    if (postsError)
      return respondError(req, res, 400, "Error al buscar publicaciones");
    posts.length === 0
      ? respondSuccess(req, res, 200, "No existen publicaciones actualmente")
      : respondSuccess(req, res, 200, {
          message: "Se encontraron las siguientes publicaciones: ",
          data: posts,
        });
  } catch (error) {
    handleError(error, "post.controller -> gestPosts");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getUserPosts(req, res) {
  try {
    const { id } = req.params;
    const [posts, postsError] = await PostService.getUserPosts(id);
    if (postsError) return respondError(req, res, 400, postsError);
    if (!posts)
      return respondError(req, res, 400, "No se encontraron publicaciones");
    respondSuccess(req, res, 200, {
      message: "Publicaciones encontradas",
      data: posts,
    });
  } catch (error) {
    handleError(error, "post.controller -> getPostsById");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Controlador que maneja la solicitud para actualizar una publicacion.
 *
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Cuerpo de solicitud que contiene atributos de publicacion a actualizar.
 * @param {Object} req.id - Id del usuario que realiza la solicitud, incorporado por el middleware de autenticacion.
 * @param {Object} req.params - Parametros de solicitud que contiene el id de la publicacion a actualizar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 * - En caso de exito: Respuesta con estado "Success" | 201 y los datos de la publicacion actualizada.
 * - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */
async function updatePost(req, res) {
  try {
    const { body } = req;
    const { id: userId } = req;
    const { id } = req.params;
    const { error: bodyError } = postUpdateSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [updatedPost, updatedPostError] = await PostService.updatePost(
      id,
      body,
      userId
    );
    if (updatedPostError) return respondError(req, res, 400, updatedPostError);
    if (!updatedPost)
      return respondError(req, res, 400, "No se actualizo publicacion");
    respondSuccess(req, res, 201, {
      message: "Publicacion actualizada",
      data: updatedPost,
    });
  } catch (error) {
    handleError(error, "post.controller -> updatePost");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Controlador que maneja la solicitud para eliminar una publicacion.
 *
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.params - Parametros de solicitud que contiene el id de la publicacion a eliminar.
 * @param {Object} req.id - Id del usuario que realiza la solicitud, incorporado por el middleware de autenticacion.
 * @param {Object} req.role - Rol del usuario que realiza la solicitud, incorporado por el middleware de autenticacion.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>}
 * - En caso de exito: Respuesta con estado "Success" | 200 y mensaje de exito.
 * - En caso de error: Respuesta con estado "Error" | 400 y mensaje descriptivo de error.
 */
async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const { id: userId, role: userRole } = req;
    const [post, postError] = await PostService.deletePost(
      id,
      userId,
      userRole
    );
    if (postError) return respondError(req, res, 400, postError);
    if (!post) return respondError(req, res, 400, "No se elimino publicacion");
    respondSuccess(req, res, 200, {
      message: "Publicacion eliminada",
      data: post,
    });
  } catch (error) {
    handleError(error, "post.controller -> deletePost");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  updatePost,
  deletePost,
};
