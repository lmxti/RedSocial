/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const userController = require("../controllers/user.controller.js");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAuth = require("../middlewares/authentication.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUserByID/:id", userController.getUserByID);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
