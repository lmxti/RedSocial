import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/services/post.service";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries(["posts"]);
      const prevPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old) =>
        old.filter((p) => p._id !== postId)
      );
      return { prevPosts };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["posts"], context.prevPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}
