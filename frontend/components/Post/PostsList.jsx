import React from "react";
import PostItem from "@/components/Post/PostItem";

export default function PostList({ posts, loading, onDelete, onLike }) {
  if (loading) return <p>Cargando publicaciones</p>;
  if (!posts) return <p>No hay publicaciones</p>;
  if (posts?.length === 0) return <p>No hay publicaciones</p>;

  return (
    <div
      style={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
      {posts?.map((item) => (
        <PostItem key={item._id} post={item} onDelete={onDelete} onLike={onLike}/>
      ))}
    </div>
  );
}
