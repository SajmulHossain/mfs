/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivetRoute = ({children}) => {
  const { user, loading} = useAuth();
  if(!loading && !user) {
    return <Navigate to='/login' replace={true} />
  }
  return children;
};

export default PrivetRoute;