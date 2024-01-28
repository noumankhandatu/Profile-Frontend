import { useEffect } from "react";

import Profile from "../components/Profile";
import { useGetAllAlertQuery } from "../redux/api";

const Home = () => {
  const { data: stories, error, isLoading } = useGetAllAlertQuery();

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  return (
    <div>
      <Profile />
      <h1>hello {error && "error"}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p style={{ fontSize: "16px" }}>{stories && "hello world"}</p>
      )}
    </div>
  );
};

export default Home;
