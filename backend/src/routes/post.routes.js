/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const postController = require("../controllers/post.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */

/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create", postController.createPost);

module.exports = router;