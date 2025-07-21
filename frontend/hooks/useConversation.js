import { useState, useEffect, useCallback } from "react";
// <------------------------- SERVICIOS ------------------------->
import { fetchChats } from "@/services/chat.service";
import { socket } from "@/services/socket.service";

export const useConversation = () => {
  // Listado de conversacion(es).
  const [conversations, setConversations] = useState([]);
  // Estado de carga.
  const [loading, setLoading] = useState(false);
  // Estado de error (nulo por defecto).
  const [error, setError] = useState(null);

  // Funcion encargada de cargar la lista de conversaciones
  const loadConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchChats();
      setConversations(response.data);
    } catch (error) {
      setError("No se pudieron cargar los chats: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // 🧠 Escuchar actualizaciones en tiempo real
  useEffect(() => {
    const handleUpdate = (updatedData) => {
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv._id === updatedData.conversationId
            ? {
                ...conv,
                lastMessage: updatedData.lastMessage,
                lastSender: updatedData.lastSender,
                updatedAt: updatedData.updatedAt,
              }
            : conv
        );

        // Mover la conversación actualizada al tope
        const updatedConv = updated.find(
          (c) => c._id === updatedData.conversationId
        );
        const rest = updated.filter(
          (c) => c._id !== updatedData.conversationId
        );

        return [updatedConv, ...rest];
      });
    };

    socket.on("conversationUpdated", handleUpdate);

    return () => {
      socket.off("conversationUpdated", handleUpdate);
    };
  }, []);

  return {
    conversations,
    loading,
    error,
  };
};
