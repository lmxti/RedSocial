import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "@/services/post.service";

export function useComment(postId){
    return useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getPostComments(postId),
        enabled: !!postId, // Solo se ejecuta cuando exista postId
    });
}