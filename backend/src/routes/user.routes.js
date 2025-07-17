/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const userController = require("../controllers/user.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAthenticated = require("../middlewares/authentication.middleware.js");
const { uploadProfile } = require("../middlewares/upload.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create", uploadProfile.single('profilePicture'), userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUserByID/:id", userController.getUserByID);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

router.post("/toggleFollow/:id", isAthenticated, userController.toggleFollow);

module.exports = router;
