import { isTokenExpired } from "@/lib/utils";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  let isAuthen = false;

  const token = localStorage.getItem("token");
  if (token) {
    if (isTokenExpired(token)) {
      isAuthen = false;
      localStorage.removeItem("token");
    } else {
      isAuthen = true;
    }
  }

  return isAuthen ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
