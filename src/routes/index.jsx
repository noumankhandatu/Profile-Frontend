import Cookies from "universal-cookie";
import ProtectedRoute from "./protectedRoute";
import PublicRoutes from "./publicRoutes";
import { useEffect } from "react";
import api from "../utils/auth";

const AppRoutes = () => {
  const cookies = new Cookies(null, { path: "/" });
  const AppAccessToken = cookies.get("AppAccessToken");

  const han = async () => {
    // try {
    //   const response = await api.get("/refresh-token", {
    //     refreshToken: cookies.get("AppRefreshToken"),
    //   });
    // } catch (error) {
    //   console.log("refreshtoke nerror");
    // }
  };

  useEffect(() => {
    han(); // This will be called only once when the component mounts
  }, []);

  return AppAccessToken ? <ProtectedRoute /> : <PublicRoutes />;
};

export default AppRoutes;
