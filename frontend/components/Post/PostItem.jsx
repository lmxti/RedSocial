import { memo } from "react";
import styles from "@/styles/components/PostItem.module.css";

function PostItem({ post }) {
  return (
    <div className={styles.postCard}>
      <div className={styles.header}>
        <img alt="avatar" className={styles.avatar} src={ post.author.profilePicture ? post.author.profilePicture : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" }/>
        <div>
          <strong className={styles.author}>{post.author.name}</strong>
          <p className={styles.time}>Hace 10 minutos</p>
        </div>
      </div>

      <p className={styles.description}>{post.description}</p>

      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"/>
          </svg>
        </button>

        <button className={styles.actionButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.09 2.75a4 4 0 0 0-4 4v6.208a4 4 0 0 0 4 4h.093v3.792a.5.5 0 0 0 .839.368l4.52-4.16h4.369a4 4 0 0 0 4-4V6.75a4 4 0 0 0-4-4z"/>
          </svg>
        </button>

        <button className={styles.actionButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 4v4C6.425 9.028 3.98 14.788 3 20c-.037.206 5.384-5.962 10-6v4l8-7l-8-7z"/>
          </svg>
        </button>
      </div>

    </div>
  );
}

export default memo(PostItem);
