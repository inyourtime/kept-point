import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://kept-point-backend.vercel.app/v1",
  baseURL: "http://127.0.0.1:4499/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
