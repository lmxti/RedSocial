import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/post.service";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts, // Debe devolver { data: [...] }
    staleTime: 1000 * 60, // 1 minuto de cache fresco
  });
}
