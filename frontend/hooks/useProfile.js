// <-------------------------- MODULOS -------------------------->
import { useState, useCallback, useEffect } from "react";

// <------------------------- SERVICIOS ------------------------->
import { getProfile } from "@/services/user.service";
import { getUserPosts } from "@/services/post.service";
import { deletePost as deletePostService } from "@/services/post.service";

export const useProfile = (userId = null) => {
  // Estado para almacenar los datos de perfil de usuario.
  const [profileData, setProfileData] = useState([]);
  // Estado para almacenar los datos de publicaciones de usuario.
  const [profilePosts, setProfilePosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = useCallback(async () => {
    if (!userId) return;

    try {
      const [profileResponse, postsResponse] = await Promise.all([
        getProfile(userId),
        getUserPosts(userId),
      ]);

      setProfileData(profileResponse.data);
      setProfilePosts(postsResponse.data.data);
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

  return {
    profileData,
    profilePosts,
    deletePost,
  };
};
