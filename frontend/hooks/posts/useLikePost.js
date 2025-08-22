import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/services/post.service";

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }) => likePost(postId), // solo enviamos postId
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(["posts"]);
      const prevPosts = queryClient.getQueryData(["posts"]);

      // Actualización optimista
      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((p) => {
          if (p._id !== postId) return p;

          return {
            ...p,
            likesCount: p.likedByUser ? p.likesCount - 1 : p.likesCount + 1,
            likedByUser: !p.likedByUser,
          };
        })
      );

      return { prevPosts };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["posts"], context.prevPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}