const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");

const { handleError } = require("../utils/errorHandler.js");

async function createConversation(participantIds) {
  try {
    // Buscar si ya existe una conversación con esos participantes
    const existingConversation = await Conversation.findOne({
      participants: { $all: participantIds, $size: participantIds.length },
    });

    if (existingConversation) return [existingConversation, null];

    const newConversation = new Conversation({
      participants: participantIds,
    });

    await newConversation.save();
    return [newConversation, null];
  } catch (error) {
    handleError(error, "user.service -> createConversation");
  }
}

async function getConversations(id) {
  try {
    const conversations = await Conversation.find({ participants: id, lastMessage: { $ne: "" } })
      .populate("participants", "_id name lastName username profilePicture")
      .sort({ updatedAt: -1 });

    if (!conversations) return [null, "No se encontraron conversaciones"];

    return [conversations, null];
  } catch (error) {
    handleError(error, "user.service -> getConversations");
  }
}

async function getConversationMessages(idConversation, userId) {
  try {
    const conversation = await Conversation.findById(idConversation).populate("participants", "_id name lastName username profilePicture");
    if (!conversation) return [null, "La conversación no existe"];

    const otherUser = conversation.participants.find(p => p._id.toString() !== userId.toString());

    const messages = await Message.find( {conversationId: idConversation })
      .populate("sender", "_id name lastName username profilePicture")
      .sort({createdAt: 1})

      return [{ messages, user: otherUser }, null];
  } catch (error) {
    handleError(error, "user.service -> getConversationMessages");
  }
}

module.exports = { createConversation, getConversations, getConversationMessages };
