import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });

const accessToken = cookies.get("AppAccessToken");
const refreshToken = cookies.get("AppRefreshToken");

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        const newAccessToken = (
          await api.get("/refresh-token", {
            headers: { "x-refresh-token": refreshToken },
          })
        ).data.accessToken;
        console.log(newAccessToken, "re");
        cookies.set("AppAccessToken", newAccessToken, { path: "/" });
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
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
