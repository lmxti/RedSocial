import React, { useState } from "react";
// import { useAddComment } from "../hooks/useComments";

export default function CommentInput({ postId }) {
  const [content, setContent] = useState("");

  return (
    <form className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe un comentario..."
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 rounded">
        Comentar
      </button>
    </form>
  );
}
