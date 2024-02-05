import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const accessToken = cookies.get("AppAccessToken");
const refreshToken = cookies.get("AppRefreshToken");

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

const AppURL = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/refresh-token`, {
        headers: { "x-refresh-token": refreshToken },
      })
      .catch((err) => {
        if (err.response.status && err) {
          logoutUser();
        }
        console.log(err, "err");
      });
    if (refreshResult?.data?.accessToken) {
      const newAccessToken = refreshResult.data.accessToken;
      cookies.set("AppAccessToken", newAccessToken, { path: "/" });
      window.location.reload();
    }
  }
  return result;
};

const logoutUser = () => {
  cookies.remove("AppRefreshToken", { path: "/" });
  cookies.remove("AppAccessToken", { path: "/" });
  window.location.reload();
};

export default AppURL;
