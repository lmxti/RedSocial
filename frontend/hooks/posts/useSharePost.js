import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sharePost } from "@/services/post.service";

export function useSharePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sharePost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) => [data, ...oldPosts]);
    },
  });
}
