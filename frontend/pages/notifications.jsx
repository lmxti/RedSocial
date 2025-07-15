import React from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Notifications.module.css";

export default function notifications() {
  const mockNotifications = [
    {
      id: 1,
      type: "like",
      message: "A Juan le gustó tu publicación.",
      time: "Hace 2 horas",
    },
    {
      id: 2,
      type: "comment",
      message: "María comentó: '¡Genial publicación!'",
      time: "Hace 3 horas",
    },
    {
      id: 3,
      type: "follow",
      message: "Carlos empezó a seguirte.",
      time: "Hace 5 horas",
    },
  ];

  return (
    <Layout title={"Notificaciones | NextJS"} description={"Notificaciones recientes"} navbar={true}>
      <div className={styles.container}>
        <h2 className={styles.title}>Notificaciones</h2>
        <ul className={styles.list}>
          {mockNotifications.map((noti) => (
            <li key={noti.id} className={styles.notification}>
              <div className={styles.icon}>
                {noti.type === "like" && "❤️"}
                {noti.type === "comment" && "💬"}
                {noti.type === "follow" && "➕"}
              </div>
              <div className={styles.content}>
                <p className={styles.message}>{noti.message}</p>
                <span className={styles.time}>{noti.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
