/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const postController = require("../controllers/post.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAthenticated = require("../middlewares/authentication.middleware.js");
const { uploadImages } = require("../middlewares/upload.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create", isAthenticated, uploadImages.array('media'), postController.createPost);
router.get("/getPosts", postController.getPosts);
router.put("/updatePost/:id", isAthenticated, postController.updatePost);
router.delete("/deletePost/:id", isAthenticated, postController.deletePost);
router.get("/getUserPosts/:id", postController.getUserPosts);



module.exports = router;