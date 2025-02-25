/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

  const data = {
    isLoading,
    user,
    setUser,
    role,
    setRole
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
