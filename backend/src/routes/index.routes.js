/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <-------------------- RUTAS ESPECIFICAS ------------------------> */
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
/* <------------------------ MIDDLEWARES ---------------------------> */

/* <------------------- ENRUTADOR SECUNDARIO ----------------------> */
const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
