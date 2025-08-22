import React from "react";
import PostItem from "@/components/Post/PostItem";
import { usePostActions } from "@/hooks/posts/usePostActions";

export default function PostList({ posts, loading, onDelete, onLike }) {

  const { deletePost, likePost, sharePost } = usePostActions();

  if (loading) return <p>Cargando publicaciones...</p>;
  if (posts.length === 0) return <p>No hay publicaciones</p>;

  return (
    <div style={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {posts.map((item) => (
        <PostItem
          key={item._id}
          post={item}
          onDelete={() => deletePost.mutate(item._id)}
          onLike={() => likePost.mutate({ postId: item._id })}
          onShare={() => sharePost.mutate({ postId: item._id })}
        />
      ))}
    </div>
  );
}
