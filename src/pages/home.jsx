import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllAlertQuery } from "../redux/api";
import Button from "@mui/material/Button";
import flower from "../assets/flower.avif";
const Home = () => {
  const { data, error, isLoading } = useGetAllAlertQuery();

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);
  if (isLoading) return "Loading ...";
  if (error) return "Error with Rtk Query ...";

  return (
    <div>
      {data && (
        <p style={{ fontSize: "42px", color: "green", textAlign: "center", fontFamily: "Honk" }}>
          Welcome Back Nouman !
        </p>
      )}
      <p style={{ textAlign: "center" }}>Get a grip my nigga , Hold on </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img style={{ marginTop: 30 }} src={flower} alt="" width={"300px"} />
        <Button sx={{ mt: 4 }} variant="contained" color="warning">
          <Link to="/protected-route">Go to Protected Route</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
