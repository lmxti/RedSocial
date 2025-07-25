/* <----------------------- MODELOS --------------------------> */
const Post = require("../models/post.model.js");
const User = require("../models/user.model.js");

/* <----------------------- MODULOS --------------------------> */

/* <----------------------- SERVICIOS ------------------------> */
const { processTags } = require("./tag.service.js");

/* <----------------------- FUNCIONES ------------------------> */
const { handleError } = require("../utils/errorHandler.js");

/**
 * Servicio encargado de crear una nueva publicacion.
 *
 * @async
 * @param {Object} post - Objeto de publicacion a crear
 * @param {String} post.title - Titulo de la publicacion
 * @param {String} post.description - Descripcion de la publicacion
 * @param {String} post.author - ID del autor de la publicacion
 * @param {Array} post.tags - Array de IDs de etiquetas asociadas a la publicacion
 * @returns {Promise<[Object, String]>}
 * - En caso de exito: Retorna un array con la publicacion creada y un valor nulo.
 * - En caso de error: Retorna un array con un valor nulo y un mensaje de error.
 */
async function createPost(postData, reqFiles = null) {
  try {
    const { description, author } = postData;
    const userFound = await User.findById(author);
    if (!userFound) return [null, "No existe usuario asociado al id ingresado"];
    const media = reqFiles ? reqFiles.map((file) => file.filename) : [];

    const newPost = new Post({ author, description, media });
    await newPost.save();

    userFound.posts.push(newPost._id);

    await userFound.save();

    const populatePost = await Post.findById(newPost._id)
      .populate("author", "name username profilePicture")

    return [populatePost, null];
  } catch (error) {
    handleError(error, "post.service -> createPost");
  }
}

/**
 * Servicio encargado de obtener todas las publicaciones.
 *
 * @async
 * @returns {Promise<[Array, String]>}
 * - En caso de exito: Retorna un array con un array de publicaciones y un valor nulo.
 * - En caso de error: Retorna un array con un valor nulo y un mensaje de error.
 */
async function getPosts() {
  try {
    const posts = await Post.find().populate({
      path: "author",
      select: "name lastname username profilePicture",
    });
    if (!posts) return [null, "No se encontraron publicaciones(post's)"];
    return [posts, null];
  } catch (error) {
    handleError(error, "post.service -> getPosts");
  }
}

// getUserPosts
async function getUserPosts(id) {
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("role")
      .exec();
    if (!user) return [null, "No existe usuario asociado al id ingresado"];

    const posts = await Post.find({ author: user._id })
      .populate({ path: "author", select: "_id name" })
      .exec();

    if (!posts.length) return [null, "No se encontraron publicaciones"];

    return [posts, null];
  } catch (error) {
    handleError(error, "post.service -> getPostsById");
    return [null, "Ocurrio un error al obtener las publicaciones"];
  }
}

/**
 * Servicio encargado de actualizar una publicacion.
 *
 * @async
 * @param {String} postId - ID de la publicacion a actualizar.
 * @param {Object} post - Objeto con los datos a actualizar.
 * @param {String} post.title - Nuevo titulo de la publicacion.
 * @param {String} post.description - Nueva descripcion de la publicacion.
 * @param {Array} post.tags - Nuevos tags de la publicacion.
 * @param {String} post.visibility - Nueva visibilidad de la publicacion.
 * @returns {Promise<[Object, String]>}
 * - En caso de exito: Retorna un array con la publicacion actualizada y un valor nulo.
 * - En caso de error: Retorna un array con un valor nulo y un mensaje de error.
 */
async function updatePost(postId, post, userId) {
  try {
    const { title, description, tags, visibility } = post;
    const postFound = await Post.findById(postId);
    if (!postFound)
      return [null, "No existe publicacion asociada al id ingresado"];
    // Verificar si el usuario que intenta actualizar la publicacion es el autor de la misma
    if (postFound.author.toString() !== userId) {
      return [
        null,
        "No tienes permisos para editar publicacion, no eres el autor",
      ];
    }
    const [hashtagsIDs, tagsError] = await processTags(tags);
    if (tagsError) return [null, tagsError];
    const updateData = { title, description, tags: hashtagsIDs, visibility };
    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });
    await updatedPost.save();
    return [updatedPost, null];
  } catch (error) {
    handleError(error, "post.service -> updatedPost");
  }
}

/**
 * Servicio encargado de eliminar una publicacion.
 *
 * @async
 * @param {String} postId - ID de la publicacion a eliminar.
 * @param {String} userId - ID del usuario que intenta eliminar la publicacion.
 * @param {String} userRole - Rol del usuario que intenta eliminar la publicacion.
 * @returns {Promise<[Object, String]>}
 * - En caso de exito: Retorna un array con la publicacion eliminada y un valor nulo.
 * - En caso de error: Retorna un array con un valor nulo y un mensaje de error.
 */
async function deletePost(postId, userId, userRole) {
  try {
    // Busquequeda de publicacion
    const postFound = await Post.findById(postId);
    if (!postFound)
      return [null, "No existe publicacion asociada al id ingresado"];
    console.log("Autor publicacion", postFound.author.toString());
    // Verificar si el usuario que intenta eliminar la publicacion es el autor de la misma O un administrador
    if (postFound.author.toString() !== userId && userRole !== "admin") {
      return [
        null,
        "No tienes permisos para eliminar publicacion, no eres el autor o un administrador",
      ];
    }
    // Eliminacion de publicacion
    const postDeleted = await Post.findByIdAndDelete(postId);
    return [postDeleted, null];
  } catch (error) {
    handleError(error, "post.service -> deletePost");
  }
}

module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  updatePost,
  deletePost,
};
