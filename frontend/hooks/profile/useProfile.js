import { useProfileData } from "./useProfileData";
import { useUserPosts } from "../posts/useUserPosts";
import { useToggleFollow } from "./useToggleFollow";

export function useProfile(userId, currentUser) {
  const profileQuery = useProfileData(userId);
  const postQuery = useUserPosts(userId);
  const toggleFollowMutation = useToggleFollow(userId);

  const isOwnProfile = currentUser?.id === userId;
  const isFollowing = currentUser && profileQuery.data?.followers?.includes(currentUser.id);

  const handleToggleFollow = () => {
    if (toggleFollowMutation.isLoading) return;
    toggleFollowMutation.mutate();
  };

  return {
    profileData: profileQuery.data,
    profilePosts: postQuery.data ?? [],
    isOwnProfile,
    isFollowing,
    toggleFollow: handleToggleFollow,
    toggleFollowLoading: toggleFollowMutation.isLoading,
  };
}
