// <-------------------------- MODULOS -------------------------->
import { useState, useCallback, useEffect, use } from "react";

// <------------------------- SERVICIOS ------------------------->
import { getPosts, createPost } from "@/services/post.service";

export const usePosts = (fetchType = "all") => {
  // Estado para almacenar publicaciones.
  const [posts, setPosts] = useState([]);
  // Estado boolean indicador de carga de publicaciones.
  const [loading, setLoading] = useState(true);
  // Estado boolean indicador de refresco de 'posts'.
  const [refreshing, setRefreshing] = useState(false);
  // Estado  (null por defecto) encargado de almacenar cualquier error de carga/creacion de posts.
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    try {
      let allPosts;
      if (fetchType === "all") {
        allPosts = await getPosts();
      }
      // else if (fetchType === "following" && currentUser) {
      //     allPosts = await getPostsFollowed(currentUser.id);
      // }

      setPosts(allPosts.data.data);
      setError(null);
    } catch (error) {
      setError(error.message || "Error de carga de posts");
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCreatePost = useCallback(async (formData) => {
    try {
      const { success, data, message } = await createPost(formData);

      if (success) {
        setPosts((prev) => [data, ...prev]);
        setError(null);
        return true;
      }
      throw new Error(message);
    } catch (error) {
      setError(error.message || "Error de creacion de publicacion");
      return false;
    } finally {
      setLoading(false);
    }
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    refreshing,
    error,
    handleCreatePost,
    handleRefresh,
  };
};
