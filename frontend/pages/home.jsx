/*<---------------------------- COMPONENTES ---------------------------->*/
import Layout from "@/components/Layout";
import HomeHashtags from "@/components/Post/HomeHashtags";
import CreatePost from "@/components/Post/CreatePost";
import PostList from "@/components/Post/PostsList";
import Spinner from "@/components/Spinner";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Home.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { usePosts } from "@/hooks/usePosts";


export default function home() {
  const { posts, loading, refreshing, error, handleCreatePost, handleRefresh, deletePost } = usePosts("all");

  return (
    <Layout
      title={"Inicio | NextJS"}
      description={"Descripcion Inicio"}
      navbar={true}
      rightComponent={<HomeHashtags />}
    >
      <div className={styles.container}>
        <CreatePost onSubmit={handleCreatePost} loading={loading} />
        {error && (
          <div className={styles.error}>
            <p>Error al cargar las publicaciones: {error}</p>
          </div>
        )}
        {/* <PostList posts={posts} loading={loading} refreshing={refreshing} onRefresh={handleRefresh} onDelete={deletePost}/> */}
        {loading ? (
          <Spinner />
        ) : (
          <PostList
            posts={posts}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onDelete={deletePost}
          />
        )}
      </div>
    </Layout>
  );
}
