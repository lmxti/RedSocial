import { useState } from "react";
import styles from "@/styles/components/CommentsModal.module.css";
import { useComment } from "@/hooks/posts/useComment";
import { useCreateComment } from "@/hooks/posts/useCreateComment";

export default function CommentsModal({ postId, onClose }) {
  const { data: comments, isLoading } = useComment(postId);
  const createComment = useCreateComment();
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    createComment.mutate({ postId, text: commentText });
    setCommentText("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.commentsList}>
          {isLoading && <p>Cargando...</p>}

          {comments?.length === 0 && <p style={{ textAlign: "center"}}>No hay comentarios</p>}

          {comments?.map((c) => (
            <div key={c._id} className={styles.comment}>
              <img alt="avatar" className={styles.commentAvatar} src={"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} />
              <div>
                <strong>{c.author?.name}</strong>
                <p className={styles.commentTexT}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <img alt="avatar" className={styles.commentAvatar} src={"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} />
          <input type="text" placeholder="Escribe un comentario..." className={styles.commentInput} 
                 value={commentText}  
                 onChange={(e) =>setCommentText(e.target.value)}
          />
          <button type="submit" className={styles.commentButton}>
            Comentar
          </button>
        </form>
      </div>
    </div>
  );
}
