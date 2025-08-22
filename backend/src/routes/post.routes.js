/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const postController = require("../controllers/post.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAuthenticated = require("../middlewares/authentication.middleware.js");
const { uploadImages } = require("../middlewares/upload.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create", isAuthenticated, uploadImages.array('media'), postController.createPost);
router.get("/getPosts", postController.getPosts);
router.put("/updatePost/:id", isAuthenticated, postController.updatePost);
router.delete("/deletePost/:id", isAuthenticated, postController.deletePost);
router.get("/getUserPosts/:id", postController.getUserPosts);
router.post("/like/:postId", isAuthenticated, postController.likePostController);
router.post("/comment/:postId", isAuthenticated, postController.createComment);
router.get("/comments/:postId", postController.getPostComments);

// Compartir publicación
router.post("/share/:postId", isAuthenticated, postController.sharePostController);

// Obtener publicaciones compartidas de un usuario
router.get("/shared/:id", postController.getUserSharedPostsController);



module.exports = router;