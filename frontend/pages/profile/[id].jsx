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

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const isOwnProfile = user?.id === id;

  const { profileData, profilePosts, loading, deletePost } = useProfile(id);

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
                ? profilePicture
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
              {isOwnProfile ? (
                <>
                  <Link href={`/profile/edit`}>Editar perfil</Link>
                  {/* <button>Configuración</button> */}
                </>
              ) : (
                // <button onClick={handleToggleFollow}>
                //   {isFollowing ? "Siguiendo" : "Seguir"}
                // </button>
                <button> Seguir </button>
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
