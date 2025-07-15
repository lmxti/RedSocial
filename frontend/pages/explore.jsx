import { useEffect, useState } from "react";
/*<---------------------------- COMPONENTES ---------------------------->*/
import Layout from "@/components/Layout";
import PostList from "@/components/Post/PostsList";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Explore.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { usePosts } from "@/hooks/usePosts";

export default function explore() {
  const { posts, loading, refreshing, error, handleRefresh } = usePosts("all");

  return (
    <Layout 
      title="Explorar | NextJS" 
      description="Descubre contenido nuevo" 
      navbar={true}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <input type="text" placeholder="Buscar" />
          <PostList posts={posts} loading={loading} />
        </div>
      </div>
    </Layout>
  );
}
