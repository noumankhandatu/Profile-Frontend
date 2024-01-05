import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Header from "../components/Layout/header";
const ProtectedRoute = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={"finally logout"} />
        </Routes>
      </Router>
    </div>
  );
};
export default ProtectedRoute;
