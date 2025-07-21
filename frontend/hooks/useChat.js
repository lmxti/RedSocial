import { useEffect, useState, useCallback, useRef } from "react";
import { socket } from "@/services/socket.service";
import { fethChatMessages } from "@/services/chat.service";

/**
 * Hook personalizado para manejar una conversación de chat.
 * @param {string} conversationId - ID de la conversación.
 * @param {string} currentUserId - ID del usuario actual.
 */
export const useChat = (conversationId, currentUserId) => {
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);

  // Carga mensajes inicial
  const loadMessages = useCallback(async () => {
    if (!conversationId) return;
    try {
      setLoading(true);
      const { messages, user } = await fethChatMessages(conversationId);
      setMessages(messages);
      setOtherUser(user);
    } catch (error) {
      console.error("useChat -> loadMessages error:", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Enviar mensaje
  const sendMessage = () => {
    if (!messageText.trim()) return;
    socket.emit("sendMessage", {
      conversationId,
      senderId: currentUserId,
      text: messageText.trim(),
    });
    setMessageText("");
  };

  // Emitir evento typing con debounce simple
  useEffect(() => {
    if (!conversationId || !messageText.trim()) return;

    socket.emit("typing", {
      conversationId,
      senderId: currentUserId,
    });
  }, [messageText, conversationId, currentUserId]);

  // Auto scroll al final cuando llegan mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Suscripción a sala y recepción de mensajes
  useEffect(() => {
    if (!conversationId) return;

    socket.emit("joinRoom", { conversationId });

    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveRoom", { conversationId }); // si implementas leaveRoom
    };
  }, [conversationId]);

  // Cargar mensajes cuando cambia la conversación
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Escuchar evento typing del otro usuario
  useEffect(() => {
    const typingHandler = ({ senderId }) => {
      if (senderId !== currentUserId) {
        setIsTyping(true);

        // Limpiar después de 2 segundos sin evento typing
        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    };

    socket.on("userTyping", typingHandler);

    return () => {
      socket.off("userTyping", typingHandler);
      clearTimeout(window.typingTimeout);
    };
  }, [currentUserId]);

  return {
    messages,
    otherUser,
    loading,
    messageText,
    setMessageText,
    sendMessage,
    messagesEndRef,
    isTyping,
  };
};
