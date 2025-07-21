const ConversationService = require("../services/chat.service");
const { respondError, respondSuccess } = require("../utils/resHandler");

async function createConversation(req, res) {
  try {
    const { participants } = req.body;

    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length < 2
    ) {
      return respondError(
        req,
        res,
        400,
        "Se requieren al menos 2 participantes."
      );
    }

    const [conversation, error] = await ConversationService.createConversation(
      participants
    );
    if (error) return respondError(req, res, 400, error);
    respondSuccess(req, res, 201, conversation);
  } catch (error) {
    console.error("conversation.controller -> createConversation", error);
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getConversations(req, res) {
  try {
    const { id } = req;
    console.log("El id de usuario es:", id);
    const [conversations, error] = await ConversationService.getConversations(id);
    if (error) return respondError(req, res, 500, error);
    respondSuccess(req, res, 200, conversations);
  } catch (error) {
    console.error("conversation.controller -> getConversations", error);
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getConversationMessages(req, res) {
  try {
    const { id : idConversation } = req.params;
    const { id: userId } = req;
    const [ messages, error ] = await ConversationService.getConversationMessages(idConversation, userId);
    if(error) return respondError(req, res, 500, error);
    respondSuccess(req, res, 200, messages)
  } catch (error) {
    console.error("conversation.controller -> getConversation", error);
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = { createConversation, getConversations, getConversationMessages };
