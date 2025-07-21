import { useState, useCallback, useEffect } from "react";
// <------------------------- SERVICIOS ------------------------->
import { getPosts, createPost } from "@/services/post.service";
import { deletePost as deletePostService } from "@/services/post.service";

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
      console.log(data);

      if (success) {
        setPosts((prev) => (Array.isArray(prev) ? [data, ...prev] : [data]));
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

  const deletePost = async (postId) => {
    try {
      const { success, message } = await deletePostService(postId);

      if (success) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        console.warn("No se pudo eliminar la publicación:", message);
      }
    } catch (error) {
      console.error("Error eliminando publicación:", error);
      // También podrías notificar al usuario
    }
  };

  return {
    posts,
    loading,
    refreshing,
    error,
    handleCreatePost,
    handleRefresh,
    deletePost
  };
};
