/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <-------------------- RUTAS ESPECIFICAS ------------------------> */
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const tagRoutes = require("./tag.routes.js");
const postRoutes = require("./post.routes.js");
const conversationRoutes = require("./conversation.routes.js")
/* <------------------------ MIDDLEWARES ---------------------------> */

/* <------------------- ENRUTADOR SECUNDARIO ----------------------> */
const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/tag", tagRoutes);
router.use("/post", postRoutes);
router.use("/conversation", conversationRoutes);

module.exports = router;
