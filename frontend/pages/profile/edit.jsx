import React, { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Edit.module.css";

export default function EditPage() {
  const [name, setName] = useState("Matías San Martín");
  const [bio, setBio] = useState("Desarrollador fullstack apasionado por la tecnología.");
  const [profilePicture, setProfilePicture] = useState("https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la llamada a la API para actualizar el perfil
    console.log("Datos enviados:", { name, bio, profilePicture });
  };

  return (
    <Layout title="Editar perfil" description="Editar perfil" navbar={true}>
      <div className={styles.container}>
        <h1 className={styles.title}>Editar perfil</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.imageWrapper}>
            <img src={profilePicture} alt="Foto de perfil" className={styles.avatar} />
          </div>

          <label className={styles.label}>URL de la foto de perfil</label>
          <input
            type="text"
            className={styles.input}
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="https://..."
          />

          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />

          <label className={styles.label}>Biografía</label>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Cuéntanos sobre ti..."
          />

          <button type="submit" className={styles.button}>
            Guardar cambios
          </button>
        </form>
      </div>
    </Layout>
  );
}
