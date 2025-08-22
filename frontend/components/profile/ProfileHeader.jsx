import Link from "next/link";
import styles from "@/styles/Profile.module.css";

export default function ProfileHeader({
  profileData,
  isOwnProfile,
  isFollowing,
  toggleFollow,
  toggleFollowLoading,
  onMessage,
}) {
  return (
    <div className={styles.header}>
      <img alt="avatar" className={styles.avatar} src={ profileData?.profilePicture ||  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" } />

      <div className={styles.info}>
        <h2 className={styles.name}>
          {profileData?.name} {profileData?.lastName}
        </h2>
        <p className={styles.username}>@{profileData?.username}</p>
        <p className={styles.bio}>{profileData?.bio}</p>

        <div className={styles.stats}>
          <span>
            <strong>{profileData?.followers?.length || 0}</strong> Seguidores
          </span>
          <span>
            <strong>{profileData?.following?.length || 0}</strong> Siguiendo
          </span>
          <span>
            <strong>{profileData?.posts?.length || 0}</strong> Publicaciones
          </span>
        </div>

        <div className={styles.actions}>
          {isOwnProfile ? (
            <Link href={`/profile/edit`}>Editar perfil</Link>
          ) : (
            <>
              <button className={`${styles.followButton} ${isFollowing ? styles.following : styles.notFollowing}`}
                disabled={toggleFollowLoading}
                onClick={toggleFollow}
              >
                {toggleFollowLoading
                  ? "Cargando..."
                  : isFollowing
                  ? "Siguiendo"
                  : "Seguir"}
              </button>
              <button className={styles.messageButton} onClick={onMessage}>
                Enviar mensaje
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
