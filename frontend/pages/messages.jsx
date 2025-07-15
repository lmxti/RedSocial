import React from 'react';
import Layout from "@/components/Layout";
import styles from '@/styles/Messages.module.css';

export default function Messages() {
  const mockMessages = [
    {
      id: 1,
      user: {
        name: 'Juan Pérez',
        avatar: 'https://i.pravatar.cc/40?img=1',
      },
      lastMessage: '¿Nos juntamos mañana?',
      time: 'Hace 2 min',
    },
    {
      id: 2,
      user: {
        name: 'María López',
        avatar: 'https://i.pravatar.cc/40?img=2',
      },
      lastMessage: 'Te envié los documentos ✔️',
      time: 'Hace 1 hora',
    },
    {
      id: 3,
      user: {
        name: 'Carlos Riquelme',
        avatar: 'https://i.pravatar.cc/40?img=3',
      },
      lastMessage: 'Dale, hablamos después.',
      time: 'Ayer',
    },
  ];

  return (
    <Layout title={"Mensajes | NextJS"} description={"Mensajes privados"} navbar={true}>
      <div className={styles.container}>
        <h2 className={styles.title}>Mensajes</h2>
        <ul className={styles.list}>
          {mockMessages.map((msg) => (
            <li key={msg.id} className={styles.message}>
              <img src={msg.user.avatar} alt="avatar" className={styles.avatar} />
              <div className={styles.content}>
                <div className={styles.header}>
                  <strong className={styles.name}>{msg.user.name}</strong>
                  <span className={styles.time}>{msg.time}</span>
                </div>
                <p className={styles.lastMessage}>{msg.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
