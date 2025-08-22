/*<------------------------------ LAYOUT ------------------------------->*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import PostList from "@/components/Post/PostsList";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Explore.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { usePosts } from "@/hooks/posts/usePosts";

export default function explore() {
  const { data: posts = [], isLoading } = usePosts();

  return (
    <Layout title="Explorar | NextJS" description="Descubre contenido nuevo" navbar={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <input type="text" placeholder="Buscar" />
          <PostList posts={posts} loading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}
