import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentPost } from "@/services/post.service";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, text }) => commentPost(postId, text),
    onSuccess: (data, variables) => {
      // Refresca comentarios del post comentado
      queryClient.invalidateQueries(["comments", variables.postId]);
    }
  });
}
