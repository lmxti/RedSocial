const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

const setupChatSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Nuevo cliente conectado:", socket.id);

    // Unirse a una sala
    socket.on("joinRoom", ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room ${conversationId}`);
    });

    // Enviar mensaje
    socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
      const message = new Message({
        conversationId,
        sender: senderId,
        text,
      });
      await message.save();

      // Actualizar última actividad
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: text,
        updatedAt: new Date(),
      });

      const populatedMessage = await message.populate(
        "sender",
        "_id name lastName username profilePicture"
      );

      // Emitir a todos en la sala
      io.to(conversationId).emit("receiveMessage", populatedMessage);
    });

    socket.on("typing", ({ conversationId, senderId }) => {
      socket.to(conversationId).emit("userTyping", { senderId });
    });

    socket.on("stopTyping", ({ conversationId, senderId }) => {
      socket.to(conversationId).emit("userStopTyping", { senderId });
    });

    
  });
};

module.exports = { setupChatSockets };
