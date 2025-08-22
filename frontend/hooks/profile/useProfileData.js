import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/user.service";

export function useProfileData(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });
}
