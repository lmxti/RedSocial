/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const postController = require("../controllers/post.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAthenticated = require("../middlewares/authentication.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create",isAthenticated, postController.createPost);
router.get("/getPosts", postController.getPosts);
router.put("/updatePost/:id", isAthenticated, postController.updatePost);
router.delete("/deletePost/:id", isAthenticated, postController.deletePost);



module.exports = router;