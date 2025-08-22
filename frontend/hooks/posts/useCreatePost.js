import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/services/post.service";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      if (res.success) {
        const newPost = res.data; 
        queryClient.setQueryData(["posts"], (old = []) => [newPost, ...old]);
      } else {
        console.error("Error al crear post:", res.message);
      }
    },
  });
}