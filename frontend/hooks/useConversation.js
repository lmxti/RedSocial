import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchChats } from "@/services/chat.service";
import { socket } from "@/services/socket.service";

export function useConversations() {
  const queryClient = useQueryClient();

  // Cargar las conversaciones
  const { data, error, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchChats,
    staleTime: 1000 * 60, // 1 minuto cache fresco
  });

  // Escuchar actualizaciones en tiempo real
  useEffect(() => {
    const handleUpdate = (updatedData) => {
      queryClient.setQueryData(["conversations"], (old = []) => {
        // Actualizar lista sin mutar
        const updated = old.map((conv) =>
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

        return updatedConv ? [updatedConv, ...rest] : old;
      });
    };

    socket.on("conversationUpdated", handleUpdate);
    return () => {
      socket.off("conversationUpdated", handleUpdate);
    };
  }, [queryClient]);

  return {
    conversations: data ?? [],
    loading: isLoading,
    error,
  };
}
