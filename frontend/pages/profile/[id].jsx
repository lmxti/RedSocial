import { useRouter } from "next/router";
/*<------------------------------ LAYOUT ------------------------------->*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import Link from "next/link";
import PostList from "@/components/Post/PostsList";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Profile.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { useProfile } from "@/hooks/useProfile";
/*<------------------------------- CONTEXT ----------------------------->*/
import { useAuth } from "@/context/AuthContext";
/*<------------------------------ SERVICIOS ---------------------------->*/
import { getOrCreateConversation } from "@/services/chat.service";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const {  profileData,  profilePosts,  loading,  followLoading, isFollowing, isOwnProfile, deletePost, toggleFollow } = useProfile(id, user);

  const handleSendMessage = async () => {
    try {
      const conversation = await getOrCreateConversation(id);
      router.push(`/messages/${conversation._id}`);
    } catch (error) {
      console.error("No se pudo abrir el chat:", error);
    }
  };

  const handleToggleFollow = async () => {
    const result = await toggleFollow();
  
    if (result?.success) {
      console.log(result.message);
    } else {
      console.error(result?.message);
    }
  };

  return (
    <Layout
      title={`${profileData?.name} | Perfil`}
      description={`Perfil de ${profileData?.name}`}
      navbar={true}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            alt="avatar"
            className={styles.avatar}
            src={
              profileData?.profilePicture
                ? profileData.profilePicture
                : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
          />
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
                <strong>{profilePosts?.length || 0}</strong> Publicaciones
              </span>
            </div>

            <div className={styles.actions}>
              {isOwnProfile ? (
                <>
                  <Link href={`/profile/edit`}>
                    <a className={styles.editButton}>Editar perfil</a>
                  </Link>
                </>
              ) : (
                <>
                  <button className={`${styles.followButton} ${isFollowing ? styles.following : styles.notFollowing}`}onClick={handleToggleFollow}disabled={followLoading}>
                    {followLoading ? "Cargando" : isFollowing ? "Siguiendo" : "Seguir"}
                  </button>
                  <button className={styles.messageButton} onClick={handleSendMessage}>
                    Enviar mensaje
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <PostList
            posts={profilePosts}
            loading={loading}
            onDelete={deletePost}
          />
        </div>
      </div>
    </Layout>
  );
}