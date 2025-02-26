/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {
  const { user, isLoading, role } = useAuth();
  if(user && role === 'admin' && !isLoading) {
    return children;
  }



  return <Navigate to='/login' replace={true} />
};

export default AdminRoute;