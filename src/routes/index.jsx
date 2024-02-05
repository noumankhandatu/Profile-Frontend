import Cookies from "universal-cookie";
import ProtectedRoute from "./protectedRoute";
import PublicRoutes from "./publicRoutes";

const AppRoutes = () => {
  const cookies = new Cookies(null, { path: "/" });
  const AppAccessToken = cookies.get("AppAccessToken");

  return AppAccessToken ? <ProtectedRoute /> : <PublicRoutes />;
};

export default AppRoutes;
