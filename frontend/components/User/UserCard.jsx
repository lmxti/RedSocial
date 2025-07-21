import React from "react";
import styles from "@/styles/components/UserCard.module.css";
import Link from "next/link";

export default function UserCard({ user }) {
  return (
    <div className={styles.card}>
      <div className={styles.profile}>
        <img
          src={user?.avatar || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{user?.name} {user?.lastName}</h3>
          <h3 className={styles.name}>@{user?.username || "Usuario"}</h3>
        </div>
      </div>

      <div className={styles.actions}>
        <Link className={styles.button} href={`/profile/${user?._id}`}>Ver perfil</Link>
      </div>
    </div>
  );
}
