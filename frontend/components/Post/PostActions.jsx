import styles from "@/styles/components/PostItem.module.css";
import { FaHeart, FaCommentAlt, FaShare } from "react-icons/fa";

export default function PostActions({ likedByUser, onLike, onCommentClick, onShare }) {
  return (
    <div className={styles.actions}>
      <button onClick={onLike} className={`${styles.actionButton} ${likedByUser ? styles.liked : ''}`}>
        <FaHeart/>
         Me Gusta
      </button>
      <button className={`${styles.actionButton}`} onClick={onCommentClick}>
        <FaCommentAlt/>
        Comentar
      </button>
      <button className={styles.actionButton} onClick={onShare}> 
        <FaShare />
        Compartir
      </button>
    </div>
  );
}
