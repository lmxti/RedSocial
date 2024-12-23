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
        const { title, description, author, tags } = postData;
        const userFound = await User.findById(author);
        if(!userFound) return [null, "No existe usuario asociado al id ingresado"];
        const [hashtagsIDs, tagsError] = await processTags(tags);
        if (tagsError) return [null, tagsError];
        const media = reqFiles ? reqFiles.map(file => file.filename) : [];
        const newPost = new Post({title, description, author, tags: hashtagsIDs, media })
        await newPost.save();
        return [newPost, null];
    } catch (error) {
        handleError(error,"post.service -> createPost");
    }
};

/**
 * Servicio encargado de obtener todas las publicaciones.
 * 
 * @async
 * @returns {Promise<[Array, String]>}
 * - En caso de exito: Retorna un array con un array de publicaciones y un valor nulo.
 * - En caso de error: Retorna un array con un valor nulo y un mensaje de error.
 */
async function getPosts(){
    try {
        const posts = await Post.find()
        .populate({
            path: 'author',
            select: 'name lastname username profilePicture'
        })
        .populate({
            path: 'tags',
            select: 'name'
        })
        if(!posts) return [null, "No se encontraron publicaciones(post's)"];
        return [posts, null]
    } catch (error) {
        handleError(error, "post.service -> getPosts");
    };
};

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
async function updatePost(postId, post, userId){
    try {
        const { title, description, tags, visibility } = post;
        const postFound = await Post.findById(postId);
        if(!postFound) return [null, "No existe publicacion asociada al id ingresado"];
        // Verificar si el usuario que intenta actualizar la publicacion es el autor de la misma
        if (postFound.author.toString() !== userId) {
            return [null, "No tienes permisos para editar publicacion, no eres el autor"];
        }
        const [hashtagsIDs, tagsError] = await processTags(tags);
        if (tagsError) return [null, tagsError];
        const updateData = { title, description, tags: hashtagsIDs, visibility };
        const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {new: true});
        await updatedPost.save();
        return [updatedPost, null];
    } catch (error) {
        handleError(error, "post.service -> updatedPost");
    };
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
async function deletePost(postId, userId, userRole){
    try {
        // Busquequeda de publicacion
        const postFound = await Post.findById(postId);
        if(!postFound) return [null, "No existe publicacion asociada al id ingresado"];
        console.log("Autor publicacion", postFound.author.toString());
        // Verificar si el usuario que intenta eliminar la publicacion es el autor de la misma O un administrador
        if (postFound.author.toString() !== userId && userRole !== "admin") {
            return [null, "No tienes permisos para eliminar publicacion, no eres el autor o un administrador"];
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
    updatePost,
    deletePost
}