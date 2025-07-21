import styles from "@/styles/components/MessageItem.module.css";

export default function MessageItem({ message, isOwnMessage }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`${styles.messageItem} ${isOwnMessage ? styles.own : styles.other}`}>
      <div className={styles.messageContent}>
        <p className={styles.messageText}>{message.text}</p>
        <span className={styles.messageTime}>
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}