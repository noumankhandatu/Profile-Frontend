import React from "react";
import { Link } from "react-router-dom";

const ProtectedRoutePage = () => {
  return (
    <div>
      Hello its a protected route <Link to="/">Go home</Link>
    </div>
  );
};

export default ProtectedRoutePage;
