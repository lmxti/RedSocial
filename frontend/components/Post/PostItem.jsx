import { memo } from "react";
import styles from "@/styles/components/PostItem.module.css";
import Link from "next/link";
import PostActions from "./PostActions";
import { useAuth } from "@/context/AuthContext";

function PostItem({ post, onDelete, onLike }) {
  const { user } = useAuth();
  const isAuthor = user?.id === post.author._id;

  const likedByUser = post.likes.includes(user?.id);

  return (
    <div className={styles.postCard}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            alt="avatar"
            className={styles.avatar}
            src={
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
          />
          <div>
            <Link href={`/profile/${post.author._id}`}>
              <strong className={styles.author}>{post.author.name}</strong>
            </Link>
            <p className={styles.time}>Hace 10 minutos</p>
          </div>
        </div>

        <div className={styles.userOptions}>
          {isAuthor && (
              <button onClick={() => onDelete(post._id)} className={styles.deleteButton}>
              < svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
              </button> 
          )}
        </div>
      </div>

      <p className={styles.description}>{post.description}</p>

      <PostActions
        likes={post.likes?.length}
        likedByUser={likedByUser}
        onLike={() => onLike(post._id)}
        comments={post.comments?.length}
        shares={post.shares?.length}
      />
    </div>
  );
}

export default memo(PostItem);
