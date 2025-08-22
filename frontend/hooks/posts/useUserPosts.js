import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/services/post.service";

export function useUserPosts(userId) {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
    select: (data) => data || [],
  });
}