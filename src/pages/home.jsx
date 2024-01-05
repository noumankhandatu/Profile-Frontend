// Home.js

import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import api from "../utils/auth";
import Cookies from "universal-cookie";

const Home = () => {
  const cookies = new Cookies(null, { path: "/" });

  const [stories, setStories] = useState([]);
  const AppAccessToken = cookies.get("AppAccessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/newyork-stories", {
          headers: {
            Authorization: `Bearer ${AppAccessToken}`,
          },
        });
        setStories("Great");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div>
      <Profile />
      <h2>New York Stories</h2>
      <p style={{ fontSize: "100px" }}>{stories && stories}</p>
    </div>
  );
};

export default Home;
