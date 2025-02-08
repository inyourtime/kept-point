import axiosInstance from "./provider/axios";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  point: number;
  profile: {
    bio: string;
  } | null;
}

export const getProfile = async () => {
  const response = await axiosInstance.get<UserProfile>("/user/profile");
  return response.data;
};
