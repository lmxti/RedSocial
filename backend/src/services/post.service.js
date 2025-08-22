/* <----------------------- MODELOS --------------------------> */
const Post = require("../models/post.model.js");
const User = require("../models/user.model.js");
const Comment = require("../models/comment.model.js");

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
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // opcional: mostrar los más recientes primero
      .populate({
        path: "author",
        select: "name username profilePicture",
      })
      .populate({
        path: "originalPost",
        populate: {
          path: "author",
          select: "name username profilePicture",
        },
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

    const posts = await Post.find({ author: id })
      .sort({ createdAt: -1 })
      .populate("author", "name username profilePicture")
      .populate({
        path: "originalPost",
        populate: { path: "author", select: "name username profilePicture" }
      });

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
    const postFound = await Post.findById(postId);
    if (!postFound) return [null, "No existe publicacion asociada al id ingresado"];

    // Verificar permisos (autor o admin)
    if (postFound.author.toString() !== userId && userRole !== "admin") {
      return [null, "No tienes permisos para eliminar publicacion, no eres el autor o un administrador"];
    }

    // Eliminar la publicación
    const postDeleted = await Post.findByIdAndDelete(postId);

    if (postDeleted) {
      // Eliminar referencia en el usuario dueño de este post
      await User.findByIdAndUpdate(
        postFound.author,
        { $pull: { posts: postId } },
        { new: true }
      );
      // Eliminar comentarios asociados
      await Comment.deleteMany({ post: postId });

      // Si el post era un compartido, no afecta al original
      if (postFound.originalPost) {
        console.log("Se eliminó un post compartido, original permanece intacto.");
      } else {
        // Si es un post original, eliminar también todos los compartidos derivados
        await Post.deleteMany({ originalPost: postId });

        // Y eliminar referencias de esos compartidos en los usuarios que los hicieron
        await User.updateMany(
          { posts: { $in: [postId] } },
          { $pull: { posts: postId } }
        );
      }
    }
    return [postDeleted, null];
  } catch (error) {
    handleError(error, "post.service -> deletePost");
    return [null, "Error interno al eliminar publicacion"];
  }
}

async function likePost(postId, userId) {
  try {
    const post = await Post.findById(postId);
    if (!post) return [null, "Publicación no encontrada"];

    // Verifica si el usuario ya dio like
    const likedIndex = post.likes.findIndex((id) => id.toString() === userId);

    if (likedIndex === -1) {
      // Si no lo ha dado, agrega
      post.likes.push(userId);
    } else {
      // Si ya lo dio, quita
      post.likes.splice(likedIndex, 1);
    }

    await post.save();

    const populatedPost = await Post.findById(postId).populate(
      "author",
      "name username profilePicture"
    );

    return [populatedPost, null];
  } catch (error) {
    handleError(error, "post.service -> likePost");
    return [null, "Error interno al dar like"];
  }
}

async function createComment(postId, authorId, text) {
  try {
    const post = await Post.findById(postId);    
    if (!post) return [null, "No se encontro publicacion"];
    const comment = new Comment({ post: postId, author: authorId, text });
    const savedComment = await comment.save();
    post.comments.push(savedComment);
    await post.save();
    return [savedComment, null]
  } catch (error) {
    handleError(error, "post.service -> createComment");
    return [null, "Error interno al comentar"];
  }
}
async function getPostComments(postId) {
  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", "name username profilePicture")
      .sort({ createdAt: -1 }); // Más recientes primero

    if (!comments) return [null, "No se encontraron comentarios"];
    
    return [comments, null];
  } catch (error) {
    handleError(error, "post.service -> getPostComments");
    return [null, "Error interno al obtener comentarios"];
  }
}

async function sharePost(postId, userId, description = "") {
  try {
    const post = await Post.findById(postId);
    if (!post) return [null, "Publicación no encontrada"];
    
    // Crear un nuevo Post con referencia al original
    const sharedPost = new Post({
      author: userId,
      originalPost: postId,
      description,
    });

    await sharedPost.save();

    // Agregar referencia al usuario (igual que en createPost)
    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: sharedPost._id } },
      { new: true }
    );

    const populatedSharedPost = await Post.findById(sharedPost._id)
      .populate("author", "name username profilePicture")
      .populate({
        path: "originalPost",
        populate: { path: "author", select: "name username profilePicture" }
      });

    return [populatedSharedPost, null];
  } catch (error) {
    if (error.code === 11000) {
      return [null, "Ya compartiste esta publicación"];
    }
    handleError(error, "post.service -> sharePost");
    return [null, "Error interno al compartir"];
  }
}

// Obtener publicaciones compartidas de un usuario
async function getUserSharedPosts(userId) {
  try {
    const shares = await Share.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "post",
        populate: { path: "author", select: "name username profilePicture" },
      });

    return [shares, null];
  } catch (error) {
    handleError(error, "post.service -> getUserSharedPosts");
    return [null, "Error interno al obtener compartidos"];
  }
}


module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  updatePost,
  deletePost,
  likePost,
  createComment,
  getPostComments,
  sharePost,
  getUserSharedPosts
};
