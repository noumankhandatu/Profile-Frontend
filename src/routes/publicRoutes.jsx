import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
const PublicRoutes = () => {
  return (
    <Router>
      <Routes>
        {["/", "/signin"].map((path, id) => (
          <Route key={id} exact path={path} element={<Signin />} />
        ))}
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={"finally logout"} />
        <Route path="*" element={`No Route Found`} />
      </Routes>
    </Router>
  );
};
export default PublicRoutes;
