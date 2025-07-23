import { useState, useCallback, useEffect } from "react";
// <------------------------- SERVICIOS ------------------------->
import { getProfile, toggleFollow as toggleFollowService } from "@/services/user.service";
import { getUserPosts } from "@/services/post.service";
import { deletePost as deletePostService } from "@/services/post.service";

export const useProfile = (userId = null, currentUser = null) => {
  // Estado para almacenar los datos de perfil de usuario.
  const [profileData, setProfileData] = useState({});
  // Estado para almacenar los datos de publicaciones de usuario.
  const [profilePosts, setProfilePosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  // Verificacion de seguimiento de usuario.
  const isFollowing = currentUser && profileData?.followers?.includes(currentUser.id);
  // Verificacion si es perfil propio
  const isOwnProfile = currentUser?.id === userId;

  const fetchProfileData = useCallback(async () => {
    if (!userId) return;

    try {
      const [profileResponse, postsResponse] = await Promise.all([
        getProfile(userId),
        getUserPosts(userId),
      ]);
      // Seteo de datos de perfil de usuario.
      if (profileResponse.success) setProfileData(profileResponse.data);
      // Seteo de datos de publicaciones de usuario.
      if (postsResponse.success) setProfilePosts(postsResponse.data.data || []);
    } catch (error) {
      console.log("Error loading data profile: ", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return; // <-- no ejecutar si aún no hay ID
    fetchProfileData();
  }, [userId, fetchProfileData]);

  const deletePost = async (postId) => {
    try {
      const { success } = await deletePostService(postId);
      if (success) {
        setProfilePosts((prev) => prev.filter((p) => p._id !== postId));
      }
    } catch (error) {
      console.error("Error eliminando publicación:", error);
    }
  };

  // Función para seguir/dejar de seguir
  const toggleFollow = useCallback(async () => {
    // Verificacion de valores validos
    if (!currentUser || !userId || isOwnProfile) return;

    // Seteo de estado de carga para seguir usuario
    setFollowLoading(true);
    try {
      const response = await toggleFollowService(userId);
      
      setProfileData((prevData) => {
        const newFollowers = isFollowing 
          ? prevData.followers.filter( (followerId) => followerId !== currentUser.id )
          : [...(prevData.followers || []), currentUser.id];

        return {
          ...prevData,
          followers: newFollowers,
        };
      });

    } catch (error) {
      console.error("Error al seguir/dejar de seguir:", error);
      return { success: false, message: "Error interno del servidor" };
    } finally {
      setFollowLoading(false);
    }
  }, [currentUser, userId, isOwnProfile, isFollowing]);

  // Función para actualizar los datos del perfil desde componentes externos
  const updateProfileData = useCallback((updater) => {
    setProfileData((prevData) => {
      if (typeof updater === "function") {
        return updater(prevData);
      }
      return { ...prevData, ...updater };
    });
  }, []);

  // Función para refrescar los datos
  const refreshProfile = useCallback(() => {
    setRefreshing(true);
    fetchProfileData();
  }, [fetchProfileData]);

  return {
    profileData,
    profilePosts,
    loading,
    refreshing,
    followLoading,
    isFollowing,
    isOwnProfile,
    deletePost,
    toggleFollow,
    updateProfileData,
    refreshProfile,
  };
};
