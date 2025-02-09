import { getProfile } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 15 * 60 * 1000,
  });
};
