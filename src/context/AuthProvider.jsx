/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await axiosSecure("/user");
      if (data?.success) {
        setUser(data?.user);
        setRole(data?.role || data?.user?.role)
      } else {
        setUser(null);
      }
    };

    try {
      checkUser();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const data = {
    loading,
    user,
    setUser,
    role,
    setRole
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
