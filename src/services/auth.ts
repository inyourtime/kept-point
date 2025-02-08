import axiosInstance from "./provider/axios";

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<{ accessToken: string }>(
    "/auth/login",
    { email, password }
  );
  return response.data;
};
