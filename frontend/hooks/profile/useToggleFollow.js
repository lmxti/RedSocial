import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollow } from "@/services/user.service";

export function useToggleFollow(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleFollow(userId),
    onSuccess: () => { queryClient.invalidateQueries(["profile", userId])},
  });
}