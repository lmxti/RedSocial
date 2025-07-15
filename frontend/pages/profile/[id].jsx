import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Profile.module.css";
import { useRouter } from "next/router";
import { getProfile } from "@/services/user.service";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const [profileData, setProfileData] = useState([]);

  const getProfileData = async () => {
    try {
      const response = await getProfile(id);
      
      setProfileData(response.data.data)
    } catch (error) {
      console.log("error profilke");
    }
  };

  useEffect(() => {
    getProfileData();
  }, [id]);

  return (
    // <Layout title={`${user.name} | Perfil`} description={`Perfil de ${user.name}`} navbar={true}>
    <Layout title={`Perfil`} description={`Perfil de ...`} navbar={true}>
      <div className={styles.container}>
        {/* Perfil básico */}
        <div className={styles.header}>
          <img alt="avatar" className={styles.avatar} src={profileData.profilePicture ? profilePicture : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} />
          <div className={styles.info}>
            <h2 className={styles.name}>{profileData?.name}</h2>
            <p className={styles.username}>@{profileData?.username}</p>
            <p className={styles.bio}>{profileData?.bio}</p>

            <div className={styles.stats}>
              <span>
                <strong>{profileData?.followers?.length}</strong> Seguidores
              </span>
              <span>
                <strong>{profileData?.following?.length}</strong> Siguiendo
              </span>
              <span>
                <strong>{0}</strong> Publicaciones
              </span>
            </div>

            <div className={styles.actions}>
              <button>Editar perfil</button>
              <button>Configuración</button>
            </div>
          </div>
        </div>

        {/* Publicaciones del usuario */}
        <div className={styles.postsSection}>
          <h3>Publicaciones</h3>
          <div className={styles.placeholder}>
            <p>Aún no hay publicaciones</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
