import { useRouter } from "next/router";
/*<------------------------------ LAYOUT ------------------------------->*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import Link from "next/link";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PostList from "@/components/Post/PostsList";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Profile.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { useProfile } from "@/hooks/profile/useProfile";
/*<------------------------------- CONTEXT ----------------------------->*/
import { useAuth } from "@/context/AuthContext";
/*<------------------------------ SERVICIOS ---------------------------->*/
import { getOrCreateConversation } from "@/services/chat.service";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query; //Perfil visitado
  const { user } = useAuth(); // Usuario autenticado
  
  const {
    profileData,
    profilePosts,
    isOwnProfile,
    isFollowing,
    toggleFollow,
    toggleFollowLoading,
  } = useProfile(id, user);

  if (!profileData) return <p>Cargando...</p>;

    const handleSendMessage = async () => {
    try {
      const conversation = await getOrCreateConversation(id);
      router.push(`/messages/${conversation._id}`);
    } catch (error) {
      console.error("No se pudo abrir el chat:", error);
    }
  };

  return (
    <Layout title={`${profileData?.name} | Perfil`} description={`Perfil de ${profileData?.name}`} navbar={true}>
      <div className={styles.container}>
        <ProfileHeader 
          profileData={profileData} isOwnProfile={isOwnProfile} 
          isFollowing={isFollowing} toggleFollow={toggleFollow} toggleFollowLoading={toggleFollowLoading}
          onMessage={handleSendMessage}
        />
        <div>
          <PostList posts={profilePosts} loading={!profilePosts} />
        </div>
      </div>
    </Layout>
  );
}
