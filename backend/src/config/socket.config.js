const socketio = require("socket.io");
const { setupChatSockets } = require("../sockets/chat.sockets.js");


/**
 * Inicializa Socket.IO en el servidor HTTP y configura los eventos de sockets.
 * @param {Object} httpServer - El servidor HTTP en el que Socket.IO se debe ejecutar.
 * @returns {Object} io - El objeto Socket.IO configurado.
 */
const initializeSockets = (httpServer) => {
    const io = socketio(httpServer, {
      cors: {
        origin: "http://localhost:3000", // URL del frontend
        credentials: true,
      },
    });
    setupChatSockets(io);
    return io;
  };
  
  module.exports = { initializeSockets };