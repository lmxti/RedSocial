import React from "react";
import styles from "@/styles/Messages.module.css";
import Link from "next/link";

export default function ChatItem({ chat, currentUserId }) {
  const otherParticipant = chat.participants.find(
    (participant) => participant._id !== currentUserId
  );

  if (!otherParticipant) return null;

  return (
    <Link href={`/messages/${chat._id}`}>
    <li key={chat._id} className={styles.chatItem}>
      <img src={ "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt={`${otherParticipant.name} ${otherParticipant.lastName}`} className={styles.profilePicture}/>
      <div className={styles.chatText}>
        <strong className={styles.name}>
          {otherParticipant.name} {otherParticipant.lastName}
        </strong>
        <p className={styles.username}>@{otherParticipant.username}</p>
      </div>
    </li>
    </Link>
  );
}
