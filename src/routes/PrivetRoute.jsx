/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivetRoute = ({children}) => {
  const { user, isLoading} = useAuth();
  if (!user && !isLoading) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivetRoute;