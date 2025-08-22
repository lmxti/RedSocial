import { memo, useState } from "react";
import styles from "@/styles/components/PostItem.module.css";
import Link from "next/link";
import PostActions from "./PostActions";
import { useAuth } from "@/context/AuthContext";
import CommentsModal from "./CommentsModal";

import { FaHeart, FaCommentAlt, FaShare, FaTrash } from "react-icons/fa";

function PostItem({ post, onDelete, onLike, onShare, isEmbedded = false }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const isShared = !!post.originalPost;

  // Quien aparece en el header
  const displayAuthor = post.author;
  // Autor del contenido real (si es compartido)
  const originalAuthor = post.originalPost?.author;

  // Comparación para botón eliminar
  const isAuthor = user?.id === displayAuthor?._id;
  const likedByUser = post.likes?.includes(user?.id);

  return (
    <div
      className={`${styles.postCard} ${isEmbedded ? styles.embeddedCard : ""}`}
    >
      {/* CABECERA */}
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <img
          alt="avatar"
          className={styles.avatar}
          src={
            displayAuthor?.profilePicture ??
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
        />
        <div>
          <Link href={`/profile/${displayAuthor?._id}`}>
            <strong className={styles.author}>{displayAuthor?.name}</strong>
          </Link>

          {isShared ? (
            <p className={styles.time}>
              Compartió una publicación de{" "}
              <Link href={`/profile/${originalAuthor?._id}`}>
                {originalAuthor?.name}
              </Link>{" "}
              • {new Date(post.updatedAt).toLocaleString()}
            </p>
          ) : (
            <p className={styles.time}>
              {new Date(post.updatedAt).toLocaleString()}
            </p>

          )}
        </div>
      </div>
    </div>

      {/* DESCRIPCIÓN DEL POST (si el que comparte escribió algo) */}
      {post.description && (
        <p className={styles.description}>{post.description}</p>
      )}

      {/* SI ES UN POST COMPARTIDO */}
      {isShared && (
        <div className={styles.sharedWrapper}>
          <PostItem
            post={post.originalPost}
            onDelete={onDelete}
            onLike={onLike}
            isEmbedded={true} // importante para diferenciar el estilo y evitar acciones duplicadas
          />
        </div>
      )}

      {/* SI NO ES EMBEBIDO, MOSTRAR ESTADÍSTICAS Y ACCIONES */}
      {!isEmbedded && (
        <>
          <div className={styles.statistics}>
            <p>
              {post.likes?.length} <FaHeart />{" "}
            </p>
            <p>
              {post.comments?.length} <FaCommentAlt />{" "}
            </p>
            <p>
              {post.shares?.length} <FaShare />{" "}
            </p>
          </div>

          <PostActions
            likedByUser={likedByUser}
            onLike={onLike}
            onCommentClick={() => setShowComments(true)}
            onShare={onShare}
          />

          {showComments && (
            <CommentsModal
              postId={post._id}
              onClose={() => setShowComments(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default memo(PostItem);
