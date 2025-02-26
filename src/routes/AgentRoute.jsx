/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AgentRoute = ({ children }) => {
  const { user, isLoading, role } = useAuth();
  if (user && role === "agent" && !isLoading) {
    return children;
  }

  return <Navigate to="/login" replace={true} />;
};

export default AgentRoute;
