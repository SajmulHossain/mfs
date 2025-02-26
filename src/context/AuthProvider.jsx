/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import error from "../utils/errorToast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ['user'],
    enabled: !!localStorage.getItem("user"),
    queryFn: async() => {
      const { data } = await axiosSecure("/user");
      if (data?.success) {
        setIsDisabled(data?.isDisabled);
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
      setUser(null);
      localStorage.removeItem('user');
    } else {
      error()
    }
    return data;
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
    isDisabled,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
