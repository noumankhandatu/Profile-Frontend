import axios from "axios";
import Cookies from "universal-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

const cookies = new Cookies(null, { path: "/" });

const setAuthorizationHeader = () => {
  const accessToken = cookies.get("AppAccessToken");
  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

api.interceptors.request.use(
  (config) => {
    setAuthorizationHeader();
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        const refreshToken = cookies.get("AppRefreshToken");
        const newAccessToken = (
          await api.get("/refresh-token", {
            headers: { "x-refresh-token": refreshToken },
          })
        ).data.accessToken;

        cookies.set("AppAccessToken", newAccessToken, { path: "/" });
        setAuthorizationHeader();
        window.location.reload();
        return api(originalRequest);
      } catch (refreshError) {
        handleTokenRefreshError();
      }
    }
    return Promise.reject(error);
  }
);

const handleTokenRefreshError = () => {
  logoutUser();
};

const logoutUser = () => {
  cookies.remove("AppRefreshToken", { path: "/" });
  cookies.remove("AppAccessToken", { path: "/" });
  window.location.reload();
};

export default api;
