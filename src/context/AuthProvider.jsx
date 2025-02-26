/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import error from "../utils/errorToast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState('');

  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async() => {
      const { data } = await axiosSecure("/user");
      if (data?.success) {
        setUser(data?.user);
        setRole(data?.role || data?.user?.role);
      } else {
        setUser(null);
      }

      return data || {};
    }
  })

 const {refetch:logout, isLoading: loggingOut} = useQuery({
  queryKey: ['logout'],
  enabled: false,
  queryFn: async() => {
    const { data } = await axiosSecure('/logout');
    if(data?.success) {
      toast.success("Logout Successful!");
      setUser(null);
    } else {
      error()
    }
  }
 })
  const data = {
    isLoading,
    user,
    setUser,
    role,
    setRole,
    logout,
    loggingOut,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
