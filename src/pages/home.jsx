import { useEffect } from "react";
import { useGetAllAlertQuery, usePostTestingMutation } from "../redux/api";
import Button from "@mui/material/Button";
import flower from "../assets/flower.avif";
const Home = () => {
  const { data, error, isLoading } = useGetAllAlertQuery();
  const [postTesting] = usePostTestingMutation();

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);
  if (isLoading) return "Loading ...";
  if (error) return "Error with Rtk Query ...";

  const handleTestBackend = async () => {
    await postTesting();
  };
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
        <Button onClick={handleTestBackend} sx={{ mt: 4 }} variant="contained" color="warning">
          Test Backend
        </Button>
      </div>
    </div>
  );
};

export default Home;
