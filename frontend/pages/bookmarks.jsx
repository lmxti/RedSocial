import React from 'react';
import Layout from "@/components/Layout";
import styles from "@/styles/Bookmarks.module.css";

export default function bookmarks() {
  const savedPosts = [
    {
      id: 1,
      author: { name: "Lucía Fernández", avatar: "https://i.pravatar.cc/40?img=7" },
      description: "Esta es una publicación guardada muy interesante.",
      createdAt: "Hace 3 días"
    },
    {
      id: 2,
      author: { name: "Carlos Soto", avatar: "https://i.pravatar.cc/40?img=8" },
      description: "Otra publicación que decidí guardar.",
      createdAt: "Hace 1 semana"
    }
  ];

  return (
    <Layout title={"Guardados | NextJS"} description={"Tus publicaciones guardadas"} navbar={true}>
      <div className={styles.container}>
        <h2 className={styles.title}>Guardados</h2>

        {savedPosts.length === 0 ? (
          <p className={styles.empty}>Aún no has guardado publicaciones.</p>
        ) : (
          <div className={styles.grid}>
            {savedPosts.map((post) => (
              <div key={post.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <img src={post.author.avatar} alt="avatar" className={styles.avatar} />
                  <div>
                    <p className={styles.author}>{post.author.name}</p>
                    <span className={styles.time}>{post.createdAt}</span>
                  </div>
                </div>
                <p className={styles.description}>{post.description}</p>
                <div className={styles.actions}>
                  <button title="Eliminar de guardados">🗑️</button>
                  <button title="Ver publicación">🔗</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
