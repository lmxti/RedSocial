/* <----------------------- MODULOS --------------------------> */
const express = require("express");
/* <----------------------- CONTROLADOR ---------------------------> */
const chatController = require("../controllers/chat.controller");
/* <------------------------ MIDDLEWARES ---------------------------> */
const isAthenticated = require("../middlewares/authentication.middleware.js");
/* <------------------- ENRUTADOR TERCIARIO -----------------------> */
const router = express.Router();

router.post("/create",isAthenticated, chatController.createConversation);
router.get("/conversations", isAthenticated, chatController.getConversations);
router.get("/messages/:id", isAthenticated, chatController.getConversationMessages);

module.exports = router;
