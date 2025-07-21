import { useState, useEffect, useCallback } from "react";
// <------------------------- SERVICIOS ------------------------->
import { fetchChats } from "@/services/chat.service";

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

  return {
    conversations,
    loading,
    error
  };
};
