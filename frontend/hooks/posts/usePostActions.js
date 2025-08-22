import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useLikePost } from "@/hooks/posts/useLikePost";
import { useSharePost } from "./useSharePost";

export function usePostActions() {
  const deletePost = useDeletePost();
  const likePost = useLikePost();
  const sharePost = useSharePost();

  return {
    deletePost,
    likePost,
    sharePost
  };
}