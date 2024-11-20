/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const tagController = require("../controllers/tag.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAuth = require("../middlewares/authentication.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create", tagController.createTag);
router.get("/getTags", tagController.getTags);
router.get("/getTagById/:id", tagController.getTagByID);
router.put("/update/:id", tagController.updateTag);
router.delete("/delete/:id", tagController.deleteTag);

module.exports = router;